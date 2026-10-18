# Directus infrastructure

The CMS runs as Directus 11 backed by MySQL 8.0 locally and by the existing
MySQL service in Kubernetes. Uploaded assets are persisted independently from
the Directus container.

## Local environment

1. Copy `.env.directus.example` to `.env.directus`.
2. Fill every secret with an independent value.
3. Start the stack:

   ```powershell
   docker compose --env-file .env.directus -f docker-compose.directus.yml up -d
   ```

4. Open `http://localhost:8055`.

The named volumes are intentionally not removed by `docker compose down`.
Include them in backups before upgrades or destructive maintenance.

## Kubernetes development environment

The manifest at `kubernetes/directus-dev.yml` creates:

- the `dorivaldovalentim-cms-dev` namespace and service account;
- an opaque application secret, separate from registry credentials;
- a connection to the existing MySQL Service in the cluster;
- Directus 11 as a single-replica Deployment with a 5 Gi uploads PVC;
- health probes, resource requests and limits;
- ClusterIP services and an Ingress for `cms-dev.dorivaldovalentim.ao`.

Before applying it:

1. Replace every `CHANGE_ME` value. Prefer External Secrets, Sealed Secrets or
   another cluster secret manager instead of committing real values.
2. Set `DB_HOST`, `DB_DATABASE` and `DB_USER` for the existing MySQL instance,
   then create that database/user and grant it all privileges on this database.
3. Add `storageClassName` to the uploads PVC if the cluster has no default storage
   class.
4. Add `ingressClassName` and TLS settings expected by the cluster ingress
   controller/cert-manager.
5. If the cluster needs private registry credentials, create a separate
   `kubernetes.io/dockerconfigjson` secret and add it to the ServiceAccount as
   `imagePullSecrets`. Do not place Directus or database secrets in it.

Apply the manifest:

```bash
kubectl apply -f infrastructure/kubernetes/directus-dev.yml
kubectl -n dorivaldovalentim-cms-dev rollout status deployment/dorivaldovalentim-cms-dev
```

Directus stays at one replica while uploads use a `ReadWriteOnce` PVC. To scale
it horizontally, move files to S3-compatible object storage (or use an RWX
volume) and add Redis as shared cache/synchronization infrastructure.

## Kubernetes production environment

The production manifest is `kubernetes/directus-prod.yml` and exposes Directus
at `https://bo.dorivaldovalentim.ao`. It deliberately contains placeholders,
not production credentials.

Before applying it:

1. Point the DNS `A`/`AAAA` record for `bo.dorivaldovalentim.ao` to the public
   ingress address.
2. Confirm `DB_HOST`, `DB_DATABASE` and `DB_USER`, then create the database and
   grant the Directus user access to it.
3. Replace every `CHANGE_ME`, preferably through the cluster secret manager.
4. Set `storageClassName` on the PVC if the cluster has no default StorageClass.
5. Make sure the Ingress controller or cert-manager provisions the TLS secret
   `bo-dorivaldovalentim-ao-tls`. Add the cluster-specific `ingressClassName`
   and issuer annotation when required.

Apply and follow the rollout:

```bash
kubectl apply -f infrastructure/kubernetes/directus-prod.yml
kubectl -n dorivaldovalentim-cms-prod rollout status deployment/dorivaldovalentim-cms-prod
kubectl -n dorivaldovalentim-cms-prod get pod,service,ingress,pvc
```

Once the production instance is healthy, create an ignored
`.env.directus.production` with its public URL and admin migration token, then
apply the schema and content from this workstation:

```powershell
$env:DIRECTUS_ENV_FILE='.env.directus.production'
node scripts/directus-schema.mjs
$env:SQUIDEX_ENV_FILE='.env'
node scripts/migrate-squidex-to-directus.mjs
```

Run the migration command a second time: it must report `0 new records`.
After validation, replace the admin migration token with a dedicated website
service token that can read published portfolio content and create contact
messages only.

## Website configuration during migration

Keep the current provider until the imported content has been compared:

```dotenv
NUXT_CMS_PROVIDER=squidex
NUXT_PUBLIC_DIRECTUS_URL=https://bo.dorivaldovalentim.ao
NUXT_DIRECTUS_URL=http://dorivaldovalentim-cms-prod.dorivaldovalentim-cms-prod.svc.cluster.local
NUXT_DIRECTUS_TOKEN=<read-and-create-contact-token>
```

After validation, change only `NUXT_CMS_PROVIDER` to `directus`. The Directus
token is server-only and must remain in an opaque Kubernetes Secret.

## Backups

At minimum, back up both MySQL and uploaded assets. A database dump does not
contain files from the uploads PVC.

```bash
mysqldump --single-transaction --routines --triggers \
  -h <mysql-host> -u directus -p dorivaldovalentim_directus > directus-dev.sql
```

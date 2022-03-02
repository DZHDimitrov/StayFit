using StayFit.Data.Common.Models;
using StayFit.Data.Common.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StayFit.Data.Repositories
{
    public class EfDeletableEntityRepository<TEntity> : EfRepository<TEntity>, IDeletableEntityRepository<TEntity>
        where TEntity : class, IDeletableEntity
    {
        public EfDeletableEntityRepository(AppDbContext context) 
            : base(context)
        {

        }

        public override IQueryable<TEntity> All() => base.All().Where(x => !x.IsDeleted);

        public override IQueryable<TEntity> AllAsNoTracking() => base.AllAsNoTracking().Where(x => !x.IsDeleted);

        public override async Task<TEntity> GetByIdAsync(params object[] id)
        {
            var entity = await base.GetByIdAsync(id);

            if (entity?.IsDeleted ?? false)
            {
                entity = null;
            }

            return entity;
        }

        public void HardDelete(TEntity entity)
        {
            base.Delete(entity);
        }

        public void Undelete(TEntity entity)
        {
            entity.IsDeleted = false;
            entity.DeletedOn = null;

            this.Update(entity);
        }

        public override void Delete(TEntity entity)
        {
            entity.IsDeleted = true;
            entity.DeletedOn = DateTime.UtcNow;

            this.Update(entity);
        }

        public IQueryable<TEntity> AllWithDeleted()
        {
            throw new System.NotImplementedException();
        }

        public IQueryable<TEntity> AllAsNoTrackingWithDeleted()
        {
            throw new System.NotImplementedException();
        }

        public Task<TEntity> GetByIdWithDeletedAsync(params object[] id)
        {
            throw new System.NotImplementedException();
        }
    }
}

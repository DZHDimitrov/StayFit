﻿namespace StayFit.Data.Common.Repositories
{
    using StayFit.Data.Common.Models;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IDeletableEntityRepository<TEntity> : IRepository<TEntity>
         where TEntity : class, IDeletableEntity
    {
        IQueryable<TEntity> AllWithDeleted();

        IQueryable<TEntity> AllAsNoTrackingWithDeleted();

        Task<TEntity> GetByIdWithDeletedAsync(params object[] id);

        void HardDelete(TEntity entity);

        void Undelete(TEntity entity);
    }
}

using Microsoft.EntityFrameworkCore;
using WorldCities.Data.Models;

namespace WorldCities.Data {
    public class ApplicationDbContext : DbContext {
        #region Constructor
        public ApplicationDbContext () : base () { }
        public ApplicationDbContext (DbContextOptions options) : base (options) { }
        #endregion Constructor
        #region Methods
        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            base.OnModelCreating (modelBuilder);

            modelBuilder.Entity<City> ().Property (p => p.Lat).HasColumnType ("decimal(7,4)");
            modelBuilder.Entity<City> ().Property (p => p.Lon).HasColumnType ("decimal(7,4)");

            // Map Entity names to DB Table names
            modelBuilder.Entity<City> ().ToTable ("Cities");
            modelBuilder.Entity<Country> ().ToTable ("Countries");
        }
        #endregion Methods
        #region Properties
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        #endregion Properties
    }
}
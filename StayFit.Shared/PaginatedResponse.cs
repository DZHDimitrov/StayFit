namespace StayFit.Shared
{

    using System;

    public class PaginatedResponse
    {
        public int ItemsPerPage { get; set; } = 2;

        public int Page { get; set; }

        public int Count { get; set; }

        public int Pages => (int)Math.Ceiling(this.Count / (decimal)this.ItemsPerPage);
    }
}

﻿namespace StayFit.Shared.SharedModels.Responses
{

    using System.Collections.Generic;

    public class ReadingResponse
    {
        public IEnumerable<ReadingModel> Readings { get; set; }
    }
}

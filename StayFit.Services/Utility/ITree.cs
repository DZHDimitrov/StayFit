using System;
using System.Collections.Generic;
using System.Linq;

namespace StayFit.Services.Utility
{
    public interface ITree<T>
    {
        T Data { get; }

        ITree<T> Parent { get;}

        ICollection<ITree<T>> Children { get; }

        bool IsRoot { get; }

        bool IsLeaf { get; }

        int Level { get; }
    }
}

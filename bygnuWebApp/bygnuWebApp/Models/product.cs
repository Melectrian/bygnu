//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace bygnuWebApp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public product()
        {
            this.orderProduct = new HashSet<orderProduct>();
        }
    
        public int productID { get; set; }
        public Nullable<int> categoryID { get; set; }
        public string name { get; set; }
        public int price { get; set; }
        public string description { get; set; }
        public Nullable<bool> isDiscounted { get; set; }
        public Nullable<int> discountPrice { get; set; }
        public Nullable<bool> isTopOffer { get; set; }
    
        public virtual category category { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<orderProduct> orderProduct { get; set; }
    }
}

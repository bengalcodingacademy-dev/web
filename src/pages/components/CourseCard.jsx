import { Link } from 'react-router-dom';

export function CourseCard({ c }) {
  const isMonthly = c.isMonthlyPayment;
  const price = c.priceCents || 0;
  const monthlyFee = c.monthlyFeeCents || 0;
  const duration = c.durationMonths || 0;
  
  // For monthly payment, calculate total price for discount calculation
  const totalPrice = isMonthly ? monthlyFee * duration : price;
  const original = Math.round(totalPrice * 1.8);
  const discount = original > 0 ? Math.round((1 - totalPrice / original) * 100) : 0;
  
  return (
    <Link 
      to={`/course/${c.slug}`} 
      className="group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-bca-gold/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02] overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-bca-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        {c.imageUrl && (
          <div className="relative overflow-hidden">
            <img 
              src={c.imageUrl} 
              alt={c.title} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-bca-gold transition-colors duration-300">
              {c.title}
            </h3>
            <div className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {c.shortDesc}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMonthly ? (
                <>
                  <span className="text-bca-gold font-bold text-lg">₹{monthlyFee}/month</span>
                  <span className="text-white/70 text-xs bg-white/10 px-2 py-1 rounded-full">
                    {duration} month course
                  </span>
                </>
              ) : (
                <>
                  <span className="text-bca-gold font-bold text-lg">₹{(price/100).toFixed(0)}</span>
                  <span className="text-white/40 line-through text-sm">₹{(original/100).toFixed(0)}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-bca-cyan/20 text-bca-cyan border border-bca-cyan/30">
                    {discount}% off
                  </span>
                </>
              )}
            </div>
            
            {/* Course type indicator */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-bca-gold rounded-full animate-pulse"></div>
              <span className="text-bca-gold text-xs font-medium">
                {isMonthly ? 'Monthly' : 'One-time'}
              </span>
            </div>
          </div>
          
          {/* Hover effect indicator */}
          <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-bca-gold text-sm font-medium">
              <span>Explore Course</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

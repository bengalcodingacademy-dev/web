import { Link } from 'react-router-dom';

export function CourseCard({ c, isPurchased = false }) {
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
      className={`group relative bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden h-full flex flex-col ${
        isPurchased 
          ? 'border-green-500/30 hover:border-green-400/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]' 
          : 'border-white/10 hover:border-bca-gold/30 hover:shadow-[0_0_30px_rgba(253,176,0,0.15)] hover:scale-[1.02]'
      }`}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isPurchased 
          ? 'bg-gradient-to-br from-green-500/5 to-transparent' 
          : 'bg-gradient-to-br from-bca-gold/5 to-transparent'
      }`}></div>
      
      {/* Purchased Badge */}
      {isPurchased && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Purchased
          </div>
        </div>
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Image Section - Fixed Height */}
        <div className="relative h-48 overflow-hidden">
          {c.imageUrl ? (
            <>
              <img 
                src={c.imageUrl} 
                alt={c.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-bca-gray-800 to-bca-gray-900 flex items-center justify-center">
              <div className="text-bca-gray-400 text-4xl">📚</div>
            </div>
          )}
        </div>
        
        {/* Content Section - Flexible Height */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title and Description */}
          <div className="mb-4 flex-grow">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-bca-gold transition-colors duration-300">
              {c.title}
            </h3>
            <div className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {c.shortDesc}
            </div>
          </div>
          
          {/* Pricing Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isMonthly ? (
                  <>
                    <span className="text-bca-gold font-bold text-lg">₹{monthlyFee}/month</span>
                    <span className="text-white/70 text-xs bg-white/10 px-2 py-1 rounded-full">
                      {duration} months
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
            </div>
          </div>
          
          {/* Action Section - Fixed at Bottom */}
          <div className="mt-auto">
            <div className={`flex items-center justify-center py-2 px-4 rounded-lg border transition-all duration-300 ${
              isPurchased 
                ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                : 'border-bca-gold/30 bg-bca-gold/10 text-bca-gold'
            }`}>
              <span className="text-sm font-medium">
                {isPurchased ? 'Access Course' : 'Explore Course'}
              </span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

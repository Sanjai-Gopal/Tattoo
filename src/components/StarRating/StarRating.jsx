import './StarRating.css';

function StarRating({ rating, reviews }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="star-rating">
      <div className="stars">
        {Array(fullStars).fill(0).map((_, i) => (
          <svg key={`full-${i}`} className="star" width="12" height="12" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        ))}
        {hasHalf && (
          <svg className="star" width="12" height="12" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="halfGrad">
                <stop offset="50%" stopColor="#f5a623"/>
                <stop offset="50%" stopColor="#e0e0e0"/>
              </linearGradient>
            </defs>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="url(#halfGrad)" stroke="none"/>
          </svg>
        )}
        {Array(emptyStars).fill(0).map((_, i) => (
          <svg key={`empty-${i}`} className="star" width="12" height="12" viewBox="0 0 24 24" fill="#e0e0e0" stroke="none">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        ))}
      </div>
      {reviews !== undefined && (
        <span className="review-count">({reviews})</span>
      )}
    </div>
  );
}

export default StarRating;

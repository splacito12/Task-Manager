function LoadingCard() {
    return (
        <div className='loading-card'>
            {[...Array(4)].map((_, index) => (
                <div key={index} className='col-skeleton'>
                    <header className='skeleton-header'>
                        <div className='skeleton-line skeleton-title'/>
                    </header>
                    <div className='skeleton-body'>
                        {[...Array(2)].map((_, cardIndex) => (
                            <div key={cardIndex} className='skeleton-lines'>
                                <div className='skeleton-line skeleton-line-wide'/>
                                <div className='skeleton-line skeleton-line-narrow'/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LoadingCard
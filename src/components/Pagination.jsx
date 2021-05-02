import cn from 'classnames';

export const Pagination = ({ className, count, page, onChange }) => {
    const countArr = new Array(count).fill('');
    
    return( 
        <ul className={cn('pagination', className)}>
            <li className={ cn({'disabled': page === 1}) } onClick={page > 1 ? () => onChange(page-1) : undefined }>
                <button>
                    <i className="material-icons">chevron_left</i>
                </button>
            </li>            
                {
                    countArr.map( (_, idx) => <li key={idx} className={page === idx+1 ? 'active' : 'waves-effect'}  onClick={() => onChange(idx+1)}>
                        <button>{idx + 1}</button>
                    </li> )
                }
            <li className={ cn({'disabled': page === count}) }  onClick={page < count ? () => onChange(page+1) : undefined}><button><i className="material-icons">chevron_right</i></button></li>
        </ul>
    )
}
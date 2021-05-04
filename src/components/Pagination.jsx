import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = React.memo(({ className, count, page, onChange }) => {
    const countArr = [];
    for (let i = 1; i <= count; i++) {
        countArr.push(i);
    }
    
    return( 
        <ul className={cn('pagination', className)}>
            <li className={ cn({'disabled': page === 1}) } onClick={page > 1 ? () => onChange(page-1) : undefined }>
                <Link to={ page > 1 ? `/${page-1}` : `/${page}`}>
                    <i className="material-icons">chevron_left</i>
                </Link>
            </li>            
                {
                    countArr.map( (p) => <li key={p} className={page === p ? 'active' : 'waves-effect'}  onClick={() => onChange(p)}>
                        <Link to={`/${p}`}>{p}</Link>
                    </li> )
                }
            <li className={ cn({'disabled': page === count}) }  onClick={page < count ? () => onChange(page+1) : undefined}>
                <Link to={ page < count ? `/${page+1}` : `/${page}`}>
                    <i className="material-icons">chevron_right</i>
                </Link>
            </li>
        </ul>
    )
});
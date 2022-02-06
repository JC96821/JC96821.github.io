/**
* @file
* @author jc
*/

import React from 'react';
import ReactDOM from 'react-dom';

interface ICacheComponent {
    active: boolean;
    children: any;
};

const CacheCompontnt: React.FC<ICacheComponent> = ({
    active,
    children
}) => {
    const ref = React.createRef<HTMLDivElement>();
    const [targetElement] = React.useState<any>(document.createElement('div'));

    React.useLayoutEffect(() => {
        if (active) {
            // @ts-ignore
            ref.current?.appendChild(targetElement)
        }
        else {
            try {
                // @ts-ignore
                ref.current?.removeChild(targetElement);
            }
            catch(e) {
            }
        }
    }, [active]);

    React.useEffect(() => {
        console.log('after render: ', `${+new Date()}`);
    }, []);

    React.useLayoutEffect(() => {
        console.log('before render: ', `${+new Date()}`);
    }, []);

    return (
        <>
            <div ref={ref}></div>
            {/* @ts-ignore */}
            {ReactDOM.createPortal(children, targetElement)}
        </>
    );
};

export default CacheCompontnt;
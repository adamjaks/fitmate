import React from 'react';

import './Section.scss';

const Section = (props) => (
    <div>
        <div className="Section">
            <div className={"Section__headline"}>
                <div className={"Section__headline-title"}>{ props.title }</div>
            </div>
            <div className={"Section__content"}>
                {props.children}
            </div>
        </div>
    </div>
);

Section.propTypes = {};

Section.defaultProps = {};

export default Section;

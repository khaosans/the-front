import React from 'react';

export class Textarea extends React.Component<{ id: any, name: any, value: any, onChange: any, className: any }> {
    render() {
        let {id, name, value, onChange, className} = this.props;
        return (
            <textarea id={id} name={name} value={value} onChange={onChange} className={className}/>
        );
    }
}

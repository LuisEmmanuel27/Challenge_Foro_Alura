import { useState } from 'react';
import ReactQuill from 'react-quill';

const QuillComp = () => {

    const [value, setValue] = useState('');

    return (
        <ReactQuill theme="snow" value={value} onChange={setValue} />
    )
}

export default QuillComp
import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./SyntaxHighligthingEditor.css";

function SyntaxHighlightingEditor({ language, value, onChange }) {
    const [input, setInput] = useState(value);
    const textareaRef = useRef(null);
    const preRef = useRef(null);

    useEffect(() => {
        setInput(value);
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInput(newValue);
        onChange(newValue);
    };

    // Sync scroll between textarea and syntax highlighter
    const handleScroll = () => {
        if (textareaRef.current && preRef.current) {
            preRef.current.scrollTop = textareaRef.current.scrollTop;
            preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}>
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleChange}
                onScroll={handleScroll}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 'calc(100% - 2rem)',
                    height: 'calc(100% - 2rem)',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: 'transparent',
                    backgroundColor: 'transparent',
                    border: 'none',
                    resize: 'none',
                    outline: 'none',
                    caretColor: 'black',
                    zIndex: 2,
                    whiteSpace: 'pre',
                    overflow: 'auto',
                    margin: 0
                }}
                spellCheck="false"
            />

            {/* Syntax highlighted display */}
            <div
                ref={preRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 'calc(100% - 2rem)', // Account for padding
                    height: 'calc(100% - 2rem)', // Account for padding
                    padding: '1rem',
                    pointerEvents: 'none',
                    zIndex: 1,
                    overflow: 'auto',
                    margin: 0,
                }}
            >
                <SyntaxHighlighter
                    language={language}
                    style={tomorrow}
                    customStyle={{
                        background: 'transparent',
                        margin: 0,
                        padding: 0,
                        overflow: 'visible'
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }
                    }}
                    lineNumberStyle={{
                        minWidth: '2.25em',
                        paddingRight: '1em',
                        userSelect: 'none'
                    }}
                    showLineNumbers={true}
                >
                    {input}
                </SyntaxHighlighter>
            </div>
        </div >
    );
}

export default SyntaxHighlightingEditor;
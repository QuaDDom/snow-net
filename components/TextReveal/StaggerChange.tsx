import React, { useState, useEffect } from 'react';

const StaggerTextChange = ({
    text = '<TEXT PLACEHOLDER>',
    triggerAfter = 0,
    changeTo = '<CHANGED TEXT>',
    ...props
}) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, triggerAfter);
    });

    if (typeof text !== 'string' || text.length === 0) {
        throw new Error('Wrong text property');
    }

    if (typeof changeTo !== 'string' || text.length === 0) {
        throw new Error('Wrong text property');
    }

    const letters = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            letters.push('&nbsp;');
        } else {
            letters.push([text[i]]);
        }
    }

    const changeToLetters = [];

    for (let i = 0; i < changeTo.length; i++) {
        if (changeTo[i] === ' ') {
            changeToLetters.push('&nbsp;');
        } else {
            changeToLetters.push([changeTo[i]]);
        }
    }

    return (
        <div
            style={{
                height: `${
                    props.height == 0 || props.height == null
                        ? props.fontSize == 0 || props.fontSize == null
                            ? 48
                            : props.fontSize
                        : props.height
                }${props.unit == null || props.unit == '' ? 'px' : props.unit}`,
                // width: `${props.width == 0 || props.width == null ? props.fontSize == 0 || props.fontSize == null ? 48 * letters.length : props.fontSize * letters.length : props.width}${props.unit == null || props.unit == "" ? "px" : props.unit}`
                width: `${props.width == 0 || props.width == null ? '' : props.width}${
                    props.unit == null || props.unit == '' ? 'px' : props.unit
                }`,
                overflow: 'hidden'
            }}>
            <div
                className="stagger-change-top"
                style={{
                    height: `${
                        props.height == 0 || props.height == null
                            ? props.fontSize == 0 || props.fontSize == null
                                ? 48
                                : props.fontSize
                            : props.height
                    }${props.unit == null || props.unit == '' ? 'px' : props.unit}`,
                    // width: `${props.width == 0 || props.width == null ? props.fontSize == 0 || props.fontSize == null ? 48 * letters.length : props.fontSize * letters.length : props.width}${props.unit == null || props.unit == "" ? "px" : props.unit}`
                    width: `${props.width == 0 || props.width == null ? '' : props.width}${
                        props.unit == null || props.unit == '' ? 'px' : props.unit
                    }`
                }}>
                {letters.map((item, i) => {
                    return (
                        <span
                            key={i}
                            style={{
                                transform: animate
                                    ? `translateY(${
                                          props.direction == null ||
                                          props.direction == '' ||
                                          props.direction !== 'down'
                                              ? props.fontSize == null || props.fontSize == 0
                                                  ? -48
                                                  : -props.fontSize
                                              : props.fontSize == null || props.fontSize == 0
                                              ? 48
                                              : props.fontSize
                                      }${
                                          props.unit == null || props.unit == '' ? 'px' : props.unit
                                      })`
                                    : `translateY(0${
                                          props.unit == null || props.unit == '' ? 'px' : props.unit
                                      })`,
                                transitionDelay: `${((props.duration == null || props.duration == 0
                                    ? 0.7
                                    : props.duration) /
                                    (props.stagger == null || props.stagger == 0
                                        ? 60
                                        : props.stagger)) *
                                    i}s`,
                                transitionDuration: `${
                                    props.duration == null || props.duration == 0
                                        ? 0.7
                                        : props.duration
                                }s`,
                                transitionTimingFunction: 'ease-in-out',
                                transitionProperty: 'transform',
                                color: `${
                                    props.color == '' || props.color == null
                                        ? '#282828'
                                        : props.color
                                }`,
                                fontSize: `${
                                    props.fontSize == 0 || props.fontSize == null
                                        ? 48
                                        : props.fontSize
                                }${props.unit == null || props.unit == '' ? 'px' : props.unit}`,
                                fontWeight: `${
                                    props.color == '' || props.fontWeight == null
                                        ? 'bold'
                                        : props.fontWeight
                                }`,
                                fontFamily: `${
                                    props.fontFamily == '' || props.fontFamily == null
                                        ? ''
                                        : props.fontFamily
                                }`
                            }}
                            className="stagger-animation-character">
                            {item == '&nbsp;' ? (
                                <span
                                    key={i}
                                    style={{
                                        fontSize: `${
                                            props.wordSpacing == null || props.wordSpacing == 0
                                                ? props.fontSize == 0 || props.fontSize == null
                                                    ? 48
                                                    : props.fontSize
                                                : props.wordSpacing
                                        }${
                                            props.unit == null || props.unit == ''
                                                ? 'px'
                                                : props.unit
                                        }`
                                    }}>
                                    &nbsp;
                                </span>
                            ) : (
                                item
                            )}
                        </span>
                    );
                })}
            </div>
            <div
                className="stagger-change-bottom"
                style={{
                    height: `${
                        props.height == 0 || props.height == null
                            ? props.fontSize == 0 || props.fontSize == null
                                ? 48
                                : props.fontSize
                            : props.height
                    }${props.unit == null || props.unit == '' ? 'px' : props.unit}`,
                    // width: `${props.width == 0 || props.width == null ? props.fontSize == 0 || props.fontSize == null ? 48 * letters.length : props.fontSize * letters.length : props.width}${props.unit == null || props.unit == "" ? "px" : props.unit}`
                    width: `${props.width == 0 || props.width == null ? '' : props.width}${
                        props.unit == null || props.unit == '' ? 'px' : props.unit
                    }`
                }}>
                {changeToLetters.map((item, i) => {
                    return (
                        <span
                            key={i}
                            style={{
                                transform: animate
                                    ? `translateY(${
                                          props.direction == null ||
                                          props.direction == '' ||
                                          props.direction !== 'down'
                                              ? props.fontSize == null || props.fontSize == 0
                                                  ? -48
                                                  : -props.fontSize
                                              : props.fontSize == null || props.fontSize == 0
                                              ? -48
                                              : -props.fontSize
                                      }${
                                          props.unit == null || props.unit == '' ? 'px' : props.unit
                                      })`
                                    : `translateY(${
                                          props.direction == null ||
                                          props.direction == '' ||
                                          props.direction !== 'down'
                                              ? 0
                                              : props.fontSize == null || props.fontSize == 0
                                              ? -48 * 2
                                              : -props.fontSize * 2
                                      }${
                                          props.unit == null || props.unit == '' ? 'px' : props.unit
                                      })`,
                                transitionDelay: `${((props.duration == null || props.duration == 0
                                    ? 0.7
                                    : props.duration) /
                                    (props.stagger == null || props.stagger == 0
                                        ? 60
                                        : props.stagger)) *
                                    i}s`,
                                transitionDuration: `${
                                    props.duration == null || props.duration == 0
                                        ? 0.7
                                        : props.duration
                                }s`,
                                transitionTimingFunction: 'ease-in-out',
                                transitionProperty: 'transform',
                                color: `${
                                    props.color == '' || props.color == null
                                        ? '#282828'
                                        : props.color
                                }`,
                                fontSize: `${
                                    props.fontSize == 0 || props.fontSize == null
                                        ? 48
                                        : props.fontSize
                                }${props.unit == null || props.unit == '' ? 'px' : props.unit}`,
                                fontWeight: `${
                                    props.color == '' || props.fontWeight == null
                                        ? 'bold'
                                        : props.fontWeight
                                }`,
                                fontFamily: `${
                                    props.fontFamily == '' || props.fontFamily == null
                                        ? ''
                                        : props.fontFamily
                                }`
                            }}
                            className="stagger-animation-character">
                            {item == '&nbsp;' ? (
                                <span
                                    key={i}
                                    style={{
                                        fontSize: `${
                                            props.wordSpacing == null || props.wordSpacing == 0
                                                ? props.fontSize == 0 || props.fontSize == null
                                                    ? 48
                                                    : props.fontSize
                                                : props.wordSpacing
                                        }${
                                            props.unit == null || props.unit == ''
                                                ? 'px'
                                                : props.unit
                                        }`
                                    }}>
                                    &nbsp;
                                </span>
                            ) : (
                                item
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default StaggerTextChange;

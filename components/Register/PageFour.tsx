import React from 'react';
import Button from '../Button';
import styles from '../../styles/register.module.scss';
import TextArea from '../TextArea';

interface Props {
    handleChange: () => void;
    values: any;
    register: any;
    errors: any;
}

export default function PageFour({ handleChange, values, register, errors }: Props) {
    return (
        <div>
            <div className={styles.centerContent}>
                <TextArea
                    name="bio"
                    label="Bio"
                    bg="#0f0f0f"
                    handleChange={handleChange}
                    value={values.bio}
                    inputRef={register}
                    error={errors.bio}
                />
                <Button>Register</Button>
            </div>
        </div>
    );
}

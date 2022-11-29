import React from 'react';

interface InputProps {
	label?: string;
	value?: string;
	onChange?: React.ChangeEventHandler;
	name?: string;
	isRequired?: boolean;
}

interface TextInputProps extends InputProps {
	type?: 'text' | 'number';
}

export const TextInput = (props: TextInputProps) => {
	const {
		label,
		value,
		onChange,
		name,
		isRequired = false,
		type = 'text',
	}: TextInputProps = props;

	return (
		<div className="field">
			{label && <label className="label">{label}</label>}
			<input
				className="input"
				type={type}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{isRequired && <span className="help">Required</span>}
		</div>
	);
};

interface SelectInputProps extends TextInputProps {
	options?: { value: any; text: string }[];
}

export const SelectInput = (props: SelectInputProps) => {
	let i = 0; // unique key for each option
	return (
		<div className="field">
			{props.label && <label className="label">{props.label}</label>}
			<div className="select">
				<select onChange={props.onChange} name={props.name}>
					<option></option>
					{props.options?.map((o) => (
						<option key={i++} value={o.value}>
							{o.text}
						</option>
					))}
				</select>
			</div>
			{props.isRequired && <span className="help">Required</span>}
		</div>
	);
};

interface SubmitButtonProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	disabled?: boolean;
}

export const SubmitButton = (props: SubmitButtonProps) => {
	const { onClick, children, disabled = false }: SubmitButtonProps = props;
	return (
		<div className="field">
			<button
				className="button is-large is-info is-pulled-right"
				onClick={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		</div>
	);
};

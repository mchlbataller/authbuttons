import { facebookAuth, googleAuth } from "providers/firebase";

import React from "react";
import classnames from "classnames";
import facebook from "assets/images/facebook_58.png";
import google from "assets/images/google.png";
import styled from "styled-components";
import { useRipple } from "components/buttons/AuthButtons/Ripple";

const SignInWithGoogle = styled.button`
	${(props) =>
		props.touched &&
		`
		background-color: rgba(169, 169, 169, 0.3);
		box-shadow: 0 10px 15px 10px rgba(29, 29, 29, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
		transform: translateY(1px);
		transition: 2s;
	`}

	&:focus {
		outline: none;
	}
`;

const AuthButton = (props) => {
	const ripple = React.useRef();

	useRipple(ripple, 400);

	return (
		<SignInWithGoogle
			ref={ripple}
			onClick={(e) =>
				props.onClick // Check if onClick is present
					? (props.onClick("Clicked."), props.setLoadingState(true))
					: null
			}
			onTouchStart={(e) =>
				props.onTouchStart // Check if onTouchStart is present
					? (props.onTouchStart(true), e.stopPropagation())
					: null
			}
			onTouchMove={(e) =>
				props.onTouchMove
					? (e.stopPropagation(), props.onTouchMove(false))
					: null
			}
			onTouchEnd={(e) =>
				props.onTouchEnd ? () => props.onTouchEnd(false) : null
			}
			// Append the className with the user-defined background-color and text-color.
			className={classnames(
				"w-64 border rounded-lg p-1 flex bg-white items-center mb-2 text-sm select-none transition-all",
				props.backgroundColor,
				props.textColor
			)}
			touched={props.touched}
		>
			<img
				src={props.image}
				alt="Logo"
				className="w-8 mr-8 ml-1 pointer-events-none"
			/>
			{props.label}
		</SignInWithGoogle>
	);
};

export const AuthButtons = (props) => {
	// This state handles the trigger to put CSS styles for hovers
	// See the styled-component above.
	const [touched, setTouchState] = React.useState(false);
	const handleTouch = (value) => setTouchState(value);
	return (
		<div>
			<AuthButton
				image={google}
				label={props.googleLabel}
				backgroundColor="bg-white"
				textColor="text-gray-700"
				touched={touched}
				onTouchStart={handleTouch}
				onTouchEnd={handleTouch}
				onTouchMove={handleTouch}
				onClick={(value) => googleAuth()}
				setLoadingState={props.setLoadingState}
			/>
			<AuthButton
				image={facebook}
				label={props.facebookLabel}
				backgroundColor="bg-blue-600"
				textColor="text-white"
				onClick={(value) => facebookAuth()}
				setLoadingState={props.setLoadingState}
			/>
		</div>
	);
};

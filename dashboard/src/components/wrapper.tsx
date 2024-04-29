import styled from 'styled-components'
import { ReactNode } from 'react'

type WrapperTypes = {
	children: ReactNode
	className?: string
	style?: any
}

export const Wrapper = ({ children, className, style }: WrapperTypes) => (
	<WrapperStyle className={className} style={style}>
		{children}
	</WrapperStyle>
)

const WrapperStyle = styled.main`
    animation: fade .3s;

    @keyframes fade {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

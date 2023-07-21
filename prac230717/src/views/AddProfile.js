import React from 'react';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/sandstone/Panels';
import Image from '@enact/sandstone/Image';
import { Link } from 'react-router-dom'
import Button from '@enact/sandstone/Button';
import { InputBase, InputField, InputFieldBase } from '@enact/sandstone/Input';
import { useState } from 'react';
import './CSS/mainpanel.app.css'


const AddProfile = kind({
	name: 'AddProfile',

	render: (props) => (
		<Panel {...props}>
			<Header title="Add your profile" />
			<div className="information">
				<div>
					Name
					<InputField>
					</InputField>
				</div>
				<br></br>
				Height
				<InputField>
				</InputField>
				<br></br><br></br>
				Weight
				<InputField>
				</InputField>
				<br></br><br></br>
				Target weight
				<InputField>
				</InputField>

				<Link to="/mypage/">
					<Button
						backgroundOpacity="transparent"
						size="small"
						icon="home">
						MY PAGE !
					</Button>
				</Link>
			</div>





		</Panel>
	)

});

export default AddProfile;
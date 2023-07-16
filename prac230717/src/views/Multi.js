import React from 'react';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/sandstone/Panels';
import Image from '@enact/sandstone/Image';
import { Link } from 'react-router-dom'
import Button from '@enact/sandstone/Button';
import './CSS/mainpanel.app.css'



const AddProfile = kind({
	name: 'Multi',

	render: (props) => (
		<Panel {...props}>
			<Header title="Profiles" />

			<div>
			<Link to="/mypage/">
					<Button
						backgroundOpacity="transparent"
						size="small"
						icon="home">
						MY PAGE !
					</Button>
				</Link>
			</div>

			<br></br><br></br>
			<br></br><br></br>



			

		</Panel>
	)

});

export default AddProfile;
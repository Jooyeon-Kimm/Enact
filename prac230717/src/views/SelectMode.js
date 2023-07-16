import React from 'react';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/sandstone/Panels';
import Image from '@enact/sandstone/Image';
import { Link } from 'react-router-dom'
import Button from '@enact/sandstone/Button';
import './CSS/mainpanel.app.css'

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Select Mode" />

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
			
			<div>
				<Image src="https://dummyimage.com/400x200/bd59bd/fff.png&text=Single" style={{ height: 200, width: 260 }} />
				<Image src="https://dummyimage.com/400x200/e8c93f/fff.png&text=Multi" style={{ height: 200, width: 260 }} />
			</div>

			<div>

				<Link to="/single/">
					<Button
						backgroundOpacity="transparent">
						Single
					</Button>
				</Link>



				<Link to="/multi/">
					<Button
						backgroundOpacity="transparent">
						Multi
					</Button>
				</Link>

			</div>


		</Panel>


	)
});


export default MainPanel;

import React from 'react';
import kind from '@enact/core/kind';
import { Panel, Header } from '@enact/sandstone/Panels';
import Image from '@enact/sandstone/Image';
import { Link } from 'react-router-dom'
import Button from '@enact/sandstone/Button';
import './CSS/bootstrap.css'



const AddProfile = kind({
	name: 'AddProfile',

	render: (props) => (
		<Panel {...props}>
			<Header title="Profiles" />


			<div>
				<Image src="https://dummyimage.com/400x200/54d7d9/fff.png&text=SW" style={{ height: 200, width: 260 }} />
				<Image src="https://dummyimage.com/400x200/deba71/fff.png&text=JH" style={{ height: 200, width: 260 }} />
				<Image src="https://dummyimage.com/400x200/84f565/fff.png&text=JY" style={{ height: 200, width: 260 }} />
				<Image src="https://dummyimage.com/400x200/808275/fff.png&text=†" style={{ height: 200, width: 260 }} />
			</div>

			<div className="information">
				<Link to="/selectmode/">
				<a href="#" class="btn btn-primary">SeongWoo</a>
				</Link>

				<Link to="/selectmode/">
					<Button
						backgroundOpacity="transparent">
						JooHyeong
					</Button>
				</Link>

				<Link to="/selectmode/">
					<Button
						backgroundOpacity="transparent">
						JooYeon
					</Button>
				</Link>


				<Link to="/addprofile/">
					<Button
						backgroundOpacity="transparent">
						Add
					</Button>
				</Link>
			</div>

		</Panel>
	)

});

export default AddProfile;
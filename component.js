function stateReducer(state=null, action) {
	switch(action.type) {
		case 'SHOW_DIALOG':
			return state = action
		default: 
			return state
	}	
}
var store = Redux.createStore(stateReducer);
class List extends React.Component{
	render(){
		return(
			<div className="list-container">
				<ul class="demo-list-three mdl-list specialist-list" id="specialist-medical-list">
	  				<ListItem spDatas={this.props.datas} />												
				</ul>
				<Dialog ref="dialogBlock" />
			</div>
		);
	}
}

class Button extends React.Component{
	showDialog(company) {
		store.dispatch({type: 'SHOW_DIALOG', signedCom: company, toggleDialog: 'block'})
	}
	render(){
		return(
			<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent signed-company-list" onClick={this.showDialog.bind(this,this.props.signedCompanies)}>{this.props.btnName}</button>
		);
	}
}

class Dialog extends React.Component{
	constructor() {
		super();
		this.state = {toggleState: 'none'};
		this.state = {signedComps: null};
	}
	componentDidMount() {
		store.subscribe(() =>
			this.setState({
				signedComps: store.getState().signedCom,
				toggleState: store.getState().toggleDialog
			})
		)
	}
	componentWillUnmount() {
		unsubscribe()
	}
	closeDialog() {
		this.setState({toggleState: 'none'})
	}
	render() {
		let tgVal = this.state.toggleState;
		if(this.state.signedComps !== null){
			return(
				<dialog className="mdl-dialog" id="modal-example" style={{display:tgVal}}>
					<div className="mdl-dialog__content">
					    <ul style={{padding: 0}}>
					    	{
							    this.state.signedComps.map(function(comp) {
							    	return <li style={{textAlign: 'center'}}>{comp}</li>
							    })	
							}
					    </ul>
					</div>
					<div className="mdl-dialog__actions mdl-dialog__actions--full-width">
				    	<button type="button" className="mdl-button" style={{textAlign: 'center'}} onClick={this.closeDialog.bind(this)}>关闭</button>
				    </div>
				</dialog>
			);
		}
		else{
			return(
				<dialog className="mdl-dialog" id="modal-example" style={{display:tgVal}}>
					<div className="mdl-dialog__content">
					    <ul style={{padding: 0}}>
					    	<li>没有签约企业</li>	    					    	
					    </ul>
					</div>
					<div className="mdl-dialog__actions mdl-dialog__actions--full-width">
				    	<button type="button" className="mdl-button" style={{textAlign: 'center'}} onClick={this.closeDialog.bind(this)}>关闭</button>
				    </div>
				</dialog>
			);
		}
		
	}
		
}
class ListItem extends React.Component{
	render(){
		return(
			this.props.spDatas.map((data, index) =>
				<li key={index} className="mdl-list__item mdl-list__item--three-line list-item">
					<div className ='list-card'>
						<div className ='list-box'>
							<div className ='list-img-box'>
							    <div className ='list-img'>
								       	<input type="checkbox" />
							    	<i className="material-icons mdl-list__item-avatar" id="icon">person</i>
							    </div>
						    </div>
						    <div className="list-content">
						    	<div>ludffsd</div>
						    	<div>擅长领域：{data.skilledField}</div>
						    	<div>职称：{data.jobTitle}</div>
						    	<div>经历：{data.experience}</div>
						    	<div>签约企业：{data.signedCompany}</div>
						    </div>
						    <div className="action-block">
						    	<Button btnName="签约企业列表" signedCompanies={data.signedCompany} />
						    </div>
						    
						</div>
					</div>
				</li>
			)
			
		);
		
	}
}

const dataArr = [
		{
			"skilledField":"心内科", 
			"jobTitle":"主任医师", 
			"experience":"sofhiohg", 
			"signedCompany": ['com1','com2','com3']
		},
		{
			"skilledField":"心内fhhg科", 
			"jobTitle":"主任医gcfgh师", 
			"experience":"sofhighohg", 
			"signedCompany":['com4','com5','com6']
		},
		{
			"skilledField":"心内科", 
			"jobTitle":"主任医师", 
			"experience":"sofhiohg", 
			"signedCompany":['com7','com8','com9']
		}
	];

ReactDOM.render(
	<List datas={dataArr} />,
	document.getElementById('specialist-medical-block')			
);


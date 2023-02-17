addEventListener('keydown',keydown)
addEventListener('keyup',keyup)
addEventListener('resize',resize)
addEventListener('contextmenu',(event)=>event.preventDefault())

const messageText={
	jaJP:`*このキーボードテストページでは一部のショートカットキーが無効になっています。たとえばショートカットキー操作によるブラウザバックができません。
		*PrintScreenキーの押下状況は取得できません。`,
	default:`*Some shortcut keys are disabled on this keyboard test page. For example, browser back by shortcut key operation is not possible.
		*The press status of the PrintScreen key cannot be obtained.`
}
const label=document.getElementById('label')
const area={
	keyboard:document.getElementById('keyboard'),
	main:document.getElementById('main'),
	center:document.getElementById('center'),
	Numpad:document.getElementById('Numpad'),
}
const keys={
	Escape:document.getElementById('Escape'),
	F1:document.getElementById('F1'),
	F2:document.getElementById('F2'),
	F3:document.getElementById('F3'),
	F4:document.getElementById('F4'),
	F5:document.getElementById('F5'),
	F6:document.getElementById('F6'),
	F7:document.getElementById('F7'),
	F8:document.getElementById('F8'),
	F9:document.getElementById('F9'),
	F10:document.getElementById('F10'),
	F11:document.getElementById('F11'),
	F12:document.getElementById('F12'),
	PrintScreen:document.getElementById('PrintScreen'),
	ScrollLock:document.getElementById('ScrollLock'),
	Pause:document.getElementById('Pause'),
	Backquote:document.getElementById('Backquote'),
	Digit1:document.getElementById('Digit1'),
	Digit2:document.getElementById('Digit2'),
	Digit3:document.getElementById('Digit3'),
	Digit4:document.getElementById('Digit4'),
	Digit5:document.getElementById('Digit5'),
	Digit6:document.getElementById('Digit6'),
	Digit7:document.getElementById('Digit7'),
	Digit8:document.getElementById('Digit8'),
	Digit9:document.getElementById('Digit9'),
	Digit0:document.getElementById('Digit0'),
	Minus:document.getElementById('Minus'),
	Equal:document.getElementById('Equal'),
	IntlYen:document.getElementById('IntlYen'),
	Backspace:document.getElementById('Backspace'),
	Tab:document.getElementById('Tab'),
	KeyQ:document.getElementById('KeyQ'),
	KeyW:document.getElementById('KeyW'),
	KeyE:document.getElementById('KeyE'),
	KeyR:document.getElementById('KeyR'),
	KeyT:document.getElementById('KeyT'),
	KeyY:document.getElementById('KeyY'),
	KeyU:document.getElementById('KeyU'),
	KeyI:document.getElementById('KeyI'),
	KeyO:document.getElementById('KeyO'),
	KeyP:document.getElementById('KeyP'),
	BracketLeft:document.getElementById('BracketLeft'),
	BracketRight:document.getElementById('BracketRight'),
	Enter:document.getElementById('Enter'),
	CapsLock:document.getElementById('CapsLock'),
	KeyA:document.getElementById('KeyA'),
	KeyS:document.getElementById('KeyS'),
	KeyD:document.getElementById('KeyD'),
	KeyF:document.getElementById('KeyF'),
	KeyG:document.getElementById('KeyG'),
	KeyH:document.getElementById('KeyH'),
	KeyJ:document.getElementById('KeyJ'),
	KeyK:document.getElementById('KeyK'),
	KeyL:document.getElementById('KeyL'),
	Semicolon:document.getElementById('Semicolon'),
	Quote:document.getElementById('Quote'),
	Backslash:document.getElementById('Backslash'),
	Enter2:document.getElementById('Enter2'),
	ShiftLeft:document.getElementById('ShiftLeft'),
	KeyZ:document.getElementById('KeyZ'),
	KeyX:document.getElementById('KeyX'),
	KeyC:document.getElementById('KeyC'),
	KeyV:document.getElementById('KeyV'),
	KeyB:document.getElementById('KeyB'),
	KeyN:document.getElementById('KeyN'),
	KeyM:document.getElementById('KeyM'),
	Comma:document.getElementById('Comma'),
	Period:document.getElementById('Period'),
	Slash:document.getElementById('Slash'),
	IntlRo:document.getElementById('IntlRo'),
	ShiftRight:document.getElementById('ShiftRight'),
	ControlLeft:document.getElementById('ControlLeft'),
	OSLeft:document.getElementById('OSLeft'),
	AltLeft:document.getElementById('AltLeft'),
	NonConvert:document.getElementById('NonConvert'),
	Space:document.getElementById('Space'),
	Convert:document.getElementById('Convert'),
	KanaMode:document.getElementById('KanaMode'),
	AltRight:document.getElementById('AltRight'),
	OSRight:document.getElementById('OSRight'),
	ContextMenu:document.getElementById('ContextMenu'),
	ControlRight:document.getElementById('ControlRight'),
	Insert:document.getElementById('Insert'),
	Home:document.getElementById('Home'),
	PageUp:document.getElementById('PageUp'),
	Delete:document.getElementById('Delete'),
	End:document.getElementById('End'),
	PageDown:document.getElementById('PageDown'),
	ArrowUp:document.getElementById('ArrowUp'),
	ArrowLeft:document.getElementById('ArrowLeft'),
	ArrowDown:document.getElementById('ArrowDown'),
	ArrowRight:document.getElementById('ArrowRight'),
	NumLock:document.getElementById('NumLock'),
	NumpadDivide:document.getElementById('NumpadDivide'),
	NumpadMultiply:document.getElementById('NumpadMultiply'),
	NumpadSubtract:document.getElementById('NumpadSubtract'),
	Numpad7:document.getElementById('Numpad7'),
	Numpad8:document.getElementById('Numpad8'),
	Numpad9:document.getElementById('Numpad9'),
	Numpad4:document.getElementById('Numpad4'),
	Numpad5:document.getElementById('Numpad5'),
	Numpad6:document.getElementById('Numpad6'),
	NumpadAdd:document.getElementById('NumpadAdd'),
	Numpad1:document.getElementById('Numpad1'),
	Numpad2:document.getElementById('Numpad2'),
	Numpad3:document.getElementById('Numpad3'),
	Numpad0:document.getElementById('Numpad0'),
	NumpadDecimal:document.getElementById('NumpadDecimal'),
	NumpadEnter:document.getElementById('NumpadEnter')
}
const colors={
	keydown:{
		color:'#011',
		backgroundColor:'gold',
		borderLeftColor:'gold',
		borderTopColor:'gold',
		borderRightColor:'#db0',
		borderBottomColor:'#ca0'
	},
	keyup:{
		color:'gold',
		backgroundColor:'#011',
		borderLeftColor:'#033',
		borderTopColor:'#022',
		borderRightColor:'#000',
		borderBottomColor:'#000'
	}
}

switch(navigator.language){
	case 'ja':case 'ja-JP':label.outerText=messageText.jaJP;break
	default:label.outerText=messageText.default
}
resize()

function resize(){
	const areaSize=keys.Backquote.clientWidth
	const size=areaSize+'px '+areaSize+'px '+areaSize+'px '+areaSize+'px '+areaSize+'px'
	area.keyboard.style.gridTemplateRows=areaSize+'px '+(areaSize*5)+'px'
	area.main.style.gridTemplateRows=size
	area.center.style.gridTemplateRows=size
	area.Numpad.style.gridTemplateRows=size
	const  fontSize=(keys.Digit1.clientWidth/4)+'px'
	for(let key in keys)keys[key].style.fontSize=fontSize
	keys.KanaMode.style.fontSize=(keys.KanaMode.clientWidth/8)+'px'
}

function chengeColor(code,color){
	const style=keys[code].style
	style.color=colors[color].color
	style.backgroundColor=colors[color].backgroundColor
	style.borderLeftColor=colors[color].borderLeftColor
	style.borderTopColor=colors[color].borderTopColor
	style.borderRightColor=colors[color].borderRightColor
	style.borderBottomColor=colors[color].borderBottomColor
}

function getCode(eventCode){
	switch(eventCode){
		case 'MetaRight':return 'OSRight'
		case 'MetaLeft':return 'OSLeft'
		default:return eventCode
	}
}

function keydown(event){
	event.preventDefault()
	console.log('keydown',event.code)
	const code=getCode(event.code)
	chengeColor(code,'keydown')
	if(code=='Enter')chengeColor('Enter2','keydown')
}

function keyup(event){
	event.preventDefault()
	console.log('keyup',event.code)
	const code=getCode(event.code)
	chengeColor(code,'keyup')
	if(code=='Enter')chengeColor('Enter2','keyup')
}
import{getArray}from './binary.js'

export async function getFileType(file){
	const array=await getArray(file,0,12)
	switch(array[0]){
		case 82:
			switch(array[1]){
				case 73:
					switch(array[2]){
						case 70:
							switch(array[3]){
								case 70:
									switch(array[8]){
										case 87:
											switch(array[9]){
												case 69:
													switch(array[10]){
														case 66:
															switch(array[11]){
																case 80:
																	return 'webP'
															}
													}
											}
									}
							}
					}
			}
		case 137:
			switch(array[1]){
				case 80:
					switch(array[2]){
						case 78:
							switch(array[3]){
								case 71:
									switch(array[4]){
										case 13:
											switch(array[5]){
												case 10:
													switch(array[6]){
														case 26:
															switch(array[7]){
																case 10:
																	return 'png'
															}
													}
											}
									}
							}    
					}
			}
		default: return 'other'
	}
}

export async function importText(filename){
	const file=await fetch(filename)
	return await file.text()
}

export async function loadTextAsync(file){
	const blob=await fetch(file)
	return await blob.text()
}

export function downloadJson(object,filename){
	const jsonstr=JSON.stringify(object)
	const blob=new Blob([jsonstr],{type:'application/json'})
	download(blob,filename)
}

function download(blob,filename){
	const L=document.createElement('a')
	const OBJURL=URL.createObjectURL(blob)
	L.href=OBJURL
	L.download=filename
	L.click()
	URL.revokeObjectURL(OBJURL)
}
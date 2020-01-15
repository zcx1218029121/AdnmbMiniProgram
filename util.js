import json from '@/json'
function getRandomBackground(){
return  json.colorlist[parseInt(Math.random()*11 +1)]
}

export default {
	getRandomBackground
}

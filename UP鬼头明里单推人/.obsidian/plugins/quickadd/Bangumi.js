//by 月涟Luvian
//脚本可以直接通过Bangumi搜索动画，进而抓取动漫基本信息字段。
//参考作者：@Lumos Cuman 永皓yh 风吹走记忆


const notice = (msg) => new Notice(msg, 5000);
const log = (msg) => console.log(msg);
const headers = {
    "Content-Type": "text/html; charset=utf-8",
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Referer': 'https://m.douban.com/',
    'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
}

module.exports = bangumi

let QuickAdd;
var pageNum=1;

async function bangumi(QuickAdd){
    // 内容查找提示框
    const name = await QuickAdd.quickAddApi.inputPrompt(
        "输入查询的动画名称"
    );
    if(!name){
        throw new Error("没有输入任何内容");
    }
	url = "https://bgm.tv/subject_search/"+name+"?cat=all";//这里cat=2即可只筛选动画
    console.log(url);
    let searchResult =await searchBangumi(url);
    if(!searchResult){
        throw new Error("找不到你搜索的内容");
    }
    let choice;

    while(true){
        choice = await QuickAdd.quickAddApi.suggester(
            (obj) => obj.text,
            searchResult
        );
        if(!choice){
            throw new Error("没有选择内容");
        }
        if(choice.typeId==3){
            new Notice("加载下一页");
			searchResult =await searchBangumi(choice.link);
		    if(!searchResult){
		        throw new Error("找不到你搜索的内容");
		    }
            continue;
        }else if(choice.type=="anime"){
            animeInfo = await getAnimeByurl(choice.link);
            new Notice("正在生成电影笔记🎞");
           QuickAdd.variables = {
						...animeInfo
							};
           break;
        }
    }
}

 //搜索动画并返回搜索结果列表
async function searchBangumi(url){
    let searchUrl = new URL(url);
    const res = await request({
      url: searchUrl.href,
      method: "GET",
      cache: "no-cache",
      headers: headers,
    });
    if(!res){
        return null;
    }
	
    let p = new DOMParser();
    let doc = p.parseFromString(res, "text/html");
    let $ = s => doc.querySelector(s);

    let re = $("#browserItemList");
    if(!re){
        return null;
    }
	
    let result = re.querySelectorAll(".inner");
    let itemList=[];let value = [];
		text="❔"+" 没找到想要的作品 \n"+"下一页";
		type = "none";
		typeId = 3;
		pageNum = pageNum + 1;
		link = url + "&page="+ pageNum;
	itemList.push({text:text,link:link,type:type,typeId:typeId})
    // 生成项目列表，列表项包括多个 格式为{text:text,link:link,type:type,typeId:typeId}的对象
    for(var i =0;i<result.length;i++){
        let temp = result[i];
        value = temp.querySelector("h3 span").getAttribute("class");
        if(value.includes("ico_subject_type subject_type_2")){
            text="🎞️"+" 《"+temp.querySelector("h3 a").textContent.trim()+"》 \n"+temp.querySelector(".info.tip").textContent.trim();
            type = "anime";
            typeId = 2;
            link = "https://bgm.tv" + temp.querySelector("h3 a").getAttribute("href");
            itemList.push({text:text,link:link,type:type,typeId:typeId})
        }        
    }
    if(itemList.length==0){
        return null;
    }

    //根据typeID排序，影视项 3; 影视分隔符 2
    itemList.sort(function(a,b){return a.typeId - b.typeId})

    return itemList;
}


//  //测试代码，直接输入bangumi作品网址获取信息
// async function animefrombangumi(params) {
//   QuickAdd = params;
//   const http_reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
//   const http_reg_movie = /(http:\/\/bgm\.tv|https:\/\/bgm\.tv)((\w|=|\?|\.|\/|&|-)+)/g;
//   const query = await QuickAdd.quickAddApi.inputPrompt(
//     "请输入Bangumi动漫网址:"
//   );
//   if (!query) {
//     notice("No url entered.");
//     throw new Error("No url entered.");
//   }
// if (!http_reg.exec(query)) {
//  new Notice('复制的内容需要包含网址', 3000);
//  throw new Error("No results found.");
// }
//  const url = query.match(http_reg)[0];
//     console.log(url);
// if (http_reg_movie.exec(url)) {
// 	let moviedata = await getAnimeByurl(url);
// 	console.log(moviedata);
// 	if(moviedata)
// 	new Notice('信息数据获取成功！', 3000);
//   QuickAdd.variables = {
//     ...moviedata
//   };
// }else
// {
//  new Notice('只能解析bgm.tv相关网址', 3000);
//  throw new Error("No results found.");
// }
//  }	 

//获取动画信息
async function getAnimeByurl(url) {

 let page = await urlGet(url);

   if (!page) {
    notice("No results found.");
    throw new Error("No results found.");
  }
    let p = new DOMParser();
    let doc = p.parseFromString(page, "text/html");
     let $ = s => doc.querySelector(s);
	 let $$ = s => doc.querySelectorAll(s); 
	let movieinfo = {};

	let Type = $("#headerSubject")?.getAttribute('typeof')
	if (Type!="v:Movie"){
		new Notice("您输入的作品不是影视！"); 
		throw new Error("Not A Movie Information Input");
	}
	
	let moviename = $("meta[name='keywords']")?.content
	movieinfo.CN = moviename.split(",")[0];//中文名
	movieinfo.JP = moviename.split(",")[1];
	movieinfo.fileName = movieinfo.CN + "_" + movieinfo.JP;

	let movieType = $("small.grey")?.textContent;
	movieinfo.type = movieType;
	
	movieinfo.rating = $("span[property='v:average']")?.textContent;//评分
	movieinfo.rating = (movieinfo.rating==null)?'未知':movieinfo.rating;

	let regPoster = $("div[align='center'] > a")?.href
	let Poster= String(regPoster);
	Poster=Poster.replace("app://","http://");
	if(Poster.match("http://"))
		{ movieinfo.Poster = Poster;  }
	else
		{ movieinfo.Poster =  "https://" + Poster;  } //封面utl

	//左侧列表-文字，汇总到str
	let infobox = $$("#infobox li");
	let str = Array.from(infobox).map(li => li.innerText).join("\n");

	let regepisode =  /话数:.(\d*)/g;;
	let episode=regepisode.exec(str);
	episode=(episode==null)?'0':episode[1].trim();
	movieinfo.episode=episode;
	
	let regwebsite= /官方网站:\s*(.*)\n/gm;//官方网站为复数取第一个
	let website= regwebsite.exec(str);
	website=(website==null)?'未知':website[1].trim();
	if(website.match("http"))
		{ movieinfo.website = website;  }
	else
		{ movieinfo.website =  "https://" + website;  }

	let regdirector = /导演:([^\n]*)/; 
	let director= regdirector.exec(str)
	director=(director==null)?'未知':director[1].trim().replace(/\n|\r/g,"").replace(/\ +/g,"");
	movieinfo.director =  director ;  

 	let regstaff = /脚本:([^\n]*)/; 
	let staff= regstaff.exec(str)
	staff=(staff==null)?'未知':staff[1].trim().replace(/\n|\r/g,"").replace(/\ +/g,"");
	movieinfo.staff =  staff ;
	
	let regMusicMake = /音乐制作:([^\n]*)/;
	let MusicMake= regMusicMake.exec(str)
	MusicMake=(MusicMake==null)?'未知':MusicMake[1].trim().replace(/\n|\r/g,"").replace(/\ +/g,"");
	movieinfo.MusicMake = MusicMake;

	let regAnimeMake = /动画制作:([^\n]*)/;
	let AnimeMake = regAnimeMake.exec(str)
	AnimeMake=(AnimeMake==null)?'未知':AnimeMake[1].trim().replace(/\n|\r/g,"").replace(/\ +/g,"");
	movieinfo.AnimeMake = AnimeMake;

	let regfrom =  /原作:([^\n]*)/;;
	let from=regfrom.exec(str);
	from=String((from==null)?'-':from[1].trim());
	movieinfo.from = from;
	movieinfo.fromWho = from.split("(")[0].split("・")[0];
	movieinfo.fromWhere = from.split("（")[1]?.replace("）","");
	
	let regstartdate;
	switch (movieinfo.type){
		case "TV":
			regstartdate = /放送开始:([^\n]*)/; break;
		case "OVA":
			regstartdate = /发售日:([^\n]*)/; break;
		case "剧场版":
			regstartdate = /上映年度:([^\n]*)/; break;
		default:
			regstartdate = /放送开始:([^\n]*)/;
	}
	let startdate= regstartdate.exec(str)
	startdate=(startdate==null)?'未知':startdate[1].trim().replace(/\n|\r/g,"").replace(/\ +/g,"");
	movieinfo.date = startdate;
	movieinfo.year = movieinfo.date.split("年")[0];
	movieinfo.month = movieinfo.date.split("年")[1].split("月")[0];

	let regalias = /别名:\s*(.*)\n/gm;
	let alias= str.match(regalias)
	alias = alias.map(match => match.trim().replace("别名:", "")).join(",");
	alias=(alias==null)?'未知':alias.trim().replace(/\ +/g,"");
	movieinfo.alias = alias;
	
	//右侧-章节列表 paragraph
	let paragraphbox = $$(".prg_list li");
	let paragraph=[];let TypeNum = 1;
	paragraphbox.forEach(li => {
	  let row = [];
		//第一列 标记类型
	  let paragraphType = li.querySelector('span');
	  if (!paragraphType) {
	    row.push(TypeNum);
	  } else {
	    row.push(paragraphType.textContent.trim());
		TypeNum = TypeNum + 1;
	  }
	  let title = li.querySelector('a');
	  if (!title) {
	     row.push(''); row.push(''); row.push('');
	  } else {
		  //第二列 集数 
		  let regtitle = title.getAttribute('title');
		  row.push(regtitle.split(' ')[0].split('.')[1]); 
		  //第三列 原标题-日文
		  if (row[0]==1){		  
			row.push(regtitle.split(' ')[1]); 	  
		  } else{
			regtitle = regtitle.replace(regtitle.split(' ')[0],"");
			row.push(regtitle); 
		  }
			//第四列 标题-中文
		  let titleId = title.getAttribute('rel');
		  let titleCN = $(titleId)?.innerText;
		  let regtitleCN = /中文标题:([\s\S]*)(?=首播:)/g;
		  titleCN= titleCN.match(regtitleCN)
		  titleCN=(titleCN==null)?'未知':titleCN;
		  row.push(String(titleCN).replace("中文标题:","")); 
	  }
	  paragraph.push(row);
	});
	// console.log(paragraph);
	TypeString=[];paraList=[];opedList=[];
	for (let i = 0; i < paragraph.length; i++) {
	  if (paragraph[i][0] === 1) {
	    paraList.push('第' + paragraph[i][1] + '话 ' + paragraph[i][2] + ' '+ paragraph[i][3]); 
		  //更换章节标题的样式，请修改本行代码
	  }else if (typeof paragraph[i][0] === 'string') {
	  	TypeString = paragraph[i][0] ;
	  }else{
		opedList.push(TypeString + '-' +paragraph[i][1] +': ' + paragraph[i][2] );
		  //更换SP OP与ED的列表样式，请修改本行代码
	  }
	}
	movieinfo.paraList = Array.from(paraList).join("\n");
	movieinfo.OpEd = Array.from(opedList).join("\n");
	
	//右侧-简介
	summary = $("#subject_summary")?.textContent??'暂无简介';
    let regx = /&nbsp/gm;
 	 if (summary) {
            summary = summary.replace(regx, "\n").trim();
            summary = summary.replace(/\s\s\s\s/gm, "\n");
    }movieinfo.summary = summary;

	//主要角色列表 character
	let CharacterBox = doc.querySelectorAll("div.userContainer");
	let character = [];
	let regCharacterArray = Array.from(CharacterBox);
	regCharacterArray.forEach(userContainer => {
		let characterRow=[];
		//角色类型 名字 CV
		let CharacterInfo = userContainer.querySelector("div.info > span.tip_j");
		if (!CharacterInfo){
			character.push("--");character.push("暂无角色");character.push("暂无CV");
		} else {
			CharacterInfo = CharacterInfo.textContent;
			characterRow.push(CharacterInfo.split(" ")[0]?.trim().replace(/\n|\r/g,"").replace(/\ +/g,""));
			characterRow.push(CharacterInfo.split(" ")[1]?.trim().replace(/\n|\r/g,"").replace(/\ +/g,""));
			characterRow.push(CharacterInfo.split("CV:")[1]?.trim().replace(/\n|\r/g,"").replace(/\ +/g,""));
		}
		//缩略图utl
		let CharacterPhoto = userContainer.querySelector("span.userImage > span").getAttribute("style");
		let regCharacterPhoto = /background-image:url\('([^']*)'\)/g;
		if (!CharacterPhoto){
			character.push("");
		} else {
			CharacterPhoto = regCharacterPhoto.exec(CharacterPhoto);
			CharacterPhoto = "https:" + CharacterPhoto[1];
			characterRow.push(CharacterPhoto);	
		}
		character.push(characterRow);
	});
	// console.log(character);
	characterList=[];
	for (let i = 0; i < character.length; i++) {
	    characterList.push(character[i][1] + '-'+ character[i][0] );
		characterList.push("CV: "+ character[i][2]);
		characterList.push("![bookcover](" + character[i][3] + ")"); 
		  //更换章节标题的样式，请修改本段代码
		 //character[i][0]为主角 或 配角。character[i][1]为 角色名。character[i][2]为角色对应CV。character[i][3]为角色缩略图utl。
	}
	movieinfo.characterList = Array.from(characterList).join("\n");
	movieinfo.character1 = characterList[0*3]; movieinfo.characterCV1 = characterList[0*3+1]; movieinfo.characterPhoto1 = characterList[0*3+2];
	movieinfo.character2 = characterList[1*3]; movieinfo.characterCV2 = characterList[1*3+1]; movieinfo.characterPhoto2 = characterList[1*3+2];
	movieinfo.character3 = characterList[2*3]; movieinfo.characterCV3 = characterList[2*3+1]; movieinfo.characterPhoto3 = characterList[2*3+2];
	movieinfo.character4 = characterList[3*3]; movieinfo.characterCV4 = characterList[3*3+1]; movieinfo.characterPhoto4 = characterList[3*3+2];
	movieinfo.character5 = characterList[4*3]; movieinfo.characterCV5 = characterList[4*3+1]; movieinfo.characterPhoto5 = characterList[4*3+2];
	movieinfo.character6 = characterList[5*3]; movieinfo.characterCV6 = characterList[5*3+1]; movieinfo.characterPhoto6 = characterList[5*3+2];
	movieinfo.character7 = characterList[6*3]; movieinfo.characterCV7 = characterList[6*3+1]; movieinfo.characterPhoto7 = characterList[6*3+2];
	movieinfo.character8 = characterList[7*3]; movieinfo.characterCV8 = characterList[7*3+1]; movieinfo.characterPhoto8 = characterList[7*3+2];
	movieinfo.character9 = characterList[8*3]; movieinfo.characterCV9 = characterList[8*3+1]; movieinfo.characterPhoto9 = characterList[8*3+2];
	
	 for(var i in movieinfo)
	{
        	if(movieinfo[i]=="" || movieinfo[i]== null)
		{
           		 movieinfo[i]="未知";
        		}
    	}
  return movieinfo;
}

async function urlGet(url) {
  let finalURL = new URL(url);
  let headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.100.4758.11 Safari/537.36'
};
  const res = await request({
    url: finalURL.href,
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
  return res;
}



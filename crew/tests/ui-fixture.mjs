// Synthetic UI responses only. This module never reaches an installed backend.
const state = {tier:'idle', running:false, user_agent:''};
const settings = {};
globalThis.fixtureCalls = [];
const browser = async (route, body = {}) => {
  globalThis.fixtureCalls.push(route);
  if (route.endsWith('/start')) Object.assign(state,{tier:body.tier,running:true});
  if (route.endsWith('/stop')) Object.assign(state,{tier:'idle',running:false});
  if (route.endsWith('/settings')) state.user_agent = body.user_agent;
  if (route.endsWith('/navigate')) state.url = body.url;
  if (route.endsWith('/read')) return {title:'Public job fixture',url:'https://example.com/',text:'Azure engineering role. Synthetic browser verification content.',handles:[],document_id:'fixture-document',needs_handoff:false};
  return {ok:true,...state};
};
const client = {
  async get(path) {
    if (path.includes('/llm-browser/')) return browser(path);
    if (path.includes('/runs/')) return {status:'succeeded',code:0,output:'Synthetic search complete'};
    throw Error('Unexpected fixture GET '+path);
  },
  async post(path, body) {
    if (path.includes('/llm-browser/')) return browser(path,body);
    if (path.endsWith('/browser')) return browser(body.route,body.body);
    const {operation, args=[]} = body;
    globalThis.fixtureCalls.push(operation);
    switch(operation) {
      case 'doctor': return {code:0,output:'Synthetic verification fixture\nWebClaw: ready\nLLM Browser: managed\nSerper: not configured'};
      case 'services': return {awb:{up:true,app:'LLM Browser',raw:'idle'},paperclip:{up:false},resumeMatcher:{up:false}};
      case 'sessionsRead': return {exists:true,data:{}};
      case 'jobsRead': return {exists:true,rows:[{id:'fixture',score:'',fit_label:'unassessed',title:'Software Engineer II, Azure Arc',company:'Microsoft',location:'United States',work_mode:'remote',salary:'',matched_skills:'["Go"]',gaps:'["Confirm tenure"]',url:'https://example.com/',status:'new'}]};
      case 'applicationsRead': return {exists:true,summary:{total:0},applications:[]};
      case 'assistantProviders': return [{name:'FreeChain',ready:false,reachable:false,authenticated:false,model_count:0,detail:'Fixture: provider unavailable',credential_configured:false}];
      case 'assistantModels': case 'assistantConversations': case 'toolsList': case 'schedulesList': return [];
      case 'providerCredentialStatus': return {configured:false,saved:false,source:'Fixture'};
      case 'controlStatus': return {ready:true,managed:true};
      case 'agentsList': return {online:false,agents:[],message:'Optional fixture service unavailable'};
      case 'configRead': return {exists:true,text:settings[args[0]] || JSON.stringify({candidate:{name:'Fixture candidate',target_roles:['Cloud Engineer']},queries:['Microsoft Azure remote'],scoring:{weights:{title:.35,skills:.3,experience:.15,location:.1,responsibilities:.1}}},null,2)};
      case 'configWrite': settings[args[0]]=args[1]; return {ok:true};
      case 'searchSpawn': return {run_id:'fixture-run'};
      default: throw Error('Unexpected fixture operation '+operation);
    }
  },
  async delete(){return {cancel_requested:true};}
};
export const useAppApi = () => client;

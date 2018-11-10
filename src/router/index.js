import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const post = r => require.ensure([], () => r(require('@/page/post')), 'post');
const interview = r => require.ensure([], () => r(require('@/page/interview')), 'interview');
const resume = r => require.ensure([], () => r(require('@/page/resume')), 'resume');
const like = r => require.ensure([], () => r(require('@/page/like')), 'like');
const recommend = r => require.ensure([], () => r(require('@/page/recommend')), 'recommend');
const chat = r => require.ensure([], () => r(require('@/page/chat')), 'chat');
const overview = r => require.ensure([], () => r(require('@/page/overview')), 'overview');
const information = r => require.ensure([], () => r(require('@/page/information')), 'information');
const member = r => require.ensure([], () => r(require('@/page/member')), 'member');
const guanliyuan = r => require.ensure([], () => r(require('@/page/guanliyuan')), 'guanliyuan');
const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '/post',
			component: post,
			meta: ['岗位'],
		},{
            path: '/resume',
            component: resume,
            meta: ['简历'],
        },{
		    path:"/interview",
            component: interview,
            meta:["视频管理"]
        },{
		    path:"/like",
            component:like,
            meta:['对我感兴趣']
        },{
            path:"/like",
            component:like,
            meta:['对我感兴趣']
        },{
            path:"/recommend",
            component:recommend,
            meta:['推荐']
        },{
            path:"/chat",
            component:chat,
            meta:['沟通']
        },{
            path:"/overview",
            component:overview,
            meta:['招聘报告']
            
        },{
            path:"/information",
            component:information,
            meta:['招聘报告']
            
        },{
            path:"/member",
            component:member,
            meta:['招聘报告']
            
        },{
            path:"/guanliyuan",
            component:guanliyuan,
            meta:['管理员']
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

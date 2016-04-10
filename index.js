;(function(window, document, $, undefined) {

	var _config = {
		owner: 'monine',
		repo: 'study',
		per_page: 15
	}

	var _articleList = [
	  {
	    "url": "https://api.github.com/repos/Monine/study/issues/6",
	    "repository_url": "https://api.github.com/repos/Monine/study",
	    "labels_url": "https://api.github.com/repos/Monine/study/issues/6/labels{/name}",
	    "comments_url": "https://api.github.com/repos/Monine/study/issues/6/comments",
	    "events_url": "https://api.github.com/repos/Monine/study/issues/6/events",
	    "html_url": "https://github.com/Monine/study/issues/6",
	    "id": 140660259,
	    "number": 6,
	    "title": "关于 Javascript 的一些知识点",
	    "user": {
	      "login": "Monine",
	      "id": 8335856,
	      "avatar_url": "https://avatars.githubusercontent.com/u/8335856?v=3",
	      "gravatar_id": "",
	      "url": "https://api.github.com/users/Monine",
	      "html_url": "https://github.com/Monine",
	      "followers_url": "https://api.github.com/users/Monine/followers",
	      "following_url": "https://api.github.com/users/Monine/following{/other_user}",
	      "gists_url": "https://api.github.com/users/Monine/gists{/gist_id}",
	      "starred_url": "https://api.github.com/users/Monine/starred{/owner}{/repo}",
	      "subscriptions_url": "https://api.github.com/users/Monine/subscriptions",
	      "organizations_url": "https://api.github.com/users/Monine/orgs",
	      "repos_url": "https://api.github.com/users/Monine/repos",
	      "events_url": "https://api.github.com/users/Monine/events{/privacy}",
	      "received_events_url": "https://api.github.com/users/Monine/received_events",
	      "type": "User",
	      "site_admin": false
	    },
	    "labels": [

	    ],
	    "state": "open",
	    "locked": false,
	    "assignee": null,
	    "milestone": null,
	    "comments": 0,
	    "created_at": "2016-03-14T12:26:32Z",
	    "updated_at": "2016-03-14T12:28:24Z",
	    "closed_at": null,
	    "body": "### Promise\r\n\r\n- [大白话讲解 Promise] [16-3-14-1]\r\n\r\n  [16-3-14-1]: http://www.cnblogs.com/lvdabao/p/es6-promise-1.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io\r\n  '大白话讲解 Promise'"
	  },
	  {
	    "url": "https://api.github.com/repos/Monine/study/issues/5",
	    "repository_url": "https://api.github.com/repos/Monine/study",
	    "labels_url": "https://api.github.com/repos/Monine/study/issues/5/labels{/name}",
	    "comments_url": "https://api.github.com/repos/Monine/study/issues/5/comments",
	    "events_url": "https://api.github.com/repos/Monine/study/issues/5/events",
	    "html_url": "https://github.com/Monine/study/issues/5",
	    "id": 140059610,
	    "number": 5,
	    "title": "关于 跨站攻击 - CRSF",
	    "user": {
	      "login": "Monine",
	      "id": 8335856,
	      "avatar_url": "https://avatars.githubusercontent.com/u/8335856?v=3",
	      "gravatar_id": "",
	      "url": "https://api.github.com/users/Monine",
	      "html_url": "https://github.com/Monine",
	      "followers_url": "https://api.github.com/users/Monine/followers",
	      "following_url": "https://api.github.com/users/Monine/following{/other_user}",
	      "gists_url": "https://api.github.com/users/Monine/gists{/gist_id}",
	      "starred_url": "https://api.github.com/users/Monine/starred{/owner}{/repo}",
	      "subscriptions_url": "https://api.github.com/users/Monine/subscriptions",
	      "organizations_url": "https://api.github.com/users/Monine/orgs",
	      "repos_url": "https://api.github.com/users/Monine/repos",
	      "events_url": "https://api.github.com/users/Monine/events{/privacy}",
	      "received_events_url": "https://api.github.com/users/Monine/received_events",
	      "type": "User",
	      "site_admin": false
	    },
	    "labels": [

	    ],
	    "state": "open",
	    "locked": false,
	    "assignee": null,
	    "milestone": null,
	    "comments": 0,
	    "created_at": "2016-03-11T01:31:42Z",
	    "updated_at": "2016-03-11T01:31:42Z",
	    "closed_at": null,
	    "body": "[浅谈CSRF攻击方式] [1]\r\n\r\n[1]: http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html\r\n'浅谈CSRF攻击方式'\r\n\r\n[关于XSS（跨站脚本攻击）和CSRF（跨站请求伪造）] [2]\r\n\r\n[2]: https://cnodejs.org/topic/50463565329c5139760c34a1\r\n'关于XSS（跨站脚本攻击）和CSRF（跨站请求伪造）'"
	  },
	  {
	    "url": "https://api.github.com/repos/Monine/study/issues/4",
	    "repository_url": "https://api.github.com/repos/Monine/study",
	    "labels_url": "https://api.github.com/repos/Monine/study/issues/4/labels{/name}",
	    "comments_url": "https://api.github.com/repos/Monine/study/issues/4/comments",
	    "events_url": "https://api.github.com/repos/Monine/study/issues/4/events",
	    "html_url": "https://github.com/Monine/study/issues/4",
	    "id": 139747365,
	    "number": 4,
	    "title": "关于 跨域 - Cross-origin resource sharing",
	    "user": {
	      "login": "Monine",
	      "id": 8335856,
	      "avatar_url": "https://avatars.githubusercontent.com/u/8335856?v=3",
	      "gravatar_id": "",
	      "url": "https://api.github.com/users/Monine",
	      "html_url": "https://github.com/Monine",
	      "followers_url": "https://api.github.com/users/Monine/followers",
	      "following_url": "https://api.github.com/users/Monine/following{/other_user}",
	      "gists_url": "https://api.github.com/users/Monine/gists{/gist_id}",
	      "starred_url": "https://api.github.com/users/Monine/starred{/owner}{/repo}",
	      "subscriptions_url": "https://api.github.com/users/Monine/subscriptions",
	      "organizations_url": "https://api.github.com/users/Monine/orgs",
	      "repos_url": "https://api.github.com/users/Monine/repos",
	      "events_url": "https://api.github.com/users/Monine/events{/privacy}",
	      "received_events_url": "https://api.github.com/users/Monine/received_events",
	      "type": "User",
	      "site_admin": false
	    },
	    "labels": [

	    ],
	    "state": "open",
	    "locked": false,
	    "assignee": null,
	    "milestone": null,
	    "comments": 0,
	    "created_at": "2016-03-10T00:45:35Z",
	    "updated_at": "2016-03-11T00:36:50Z",
	    "closed_at": null,
	    "body": "- [浅谈浏览器端 JavaScript 跨域解决方法] [1]\r\n\r\n  [1]: https://github.com/rccoder/blog/issues/5\r\n  '浅谈浏览器端JavaScript跨域解决方法'"
	  },
	  {
	    "url": "https://api.github.com/repos/Monine/study/issues/3",
	    "repository_url": "https://api.github.com/repos/Monine/study",
	    "labels_url": "https://api.github.com/repos/Monine/study/issues/3/labels{/name}",
	    "comments_url": "https://api.github.com/repos/Monine/study/issues/3/comments",
	    "events_url": "https://api.github.com/repos/Monine/study/issues/3/events",
	    "html_url": "https://github.com/Monine/study/issues/3",
	    "id": 138690010,
	    "number": 3,
	    "title": "关于 HTTPS",
	    "user": {
	      "login": "Monine",
	      "id": 8335856,
	      "avatar_url": "https://avatars.githubusercontent.com/u/8335856?v=3",
	      "gravatar_id": "",
	      "url": "https://api.github.com/users/Monine",
	      "html_url": "https://github.com/Monine",
	      "followers_url": "https://api.github.com/users/Monine/followers",
	      "following_url": "https://api.github.com/users/Monine/following{/other_user}",
	      "gists_url": "https://api.github.com/users/Monine/gists{/gist_id}",
	      "starred_url": "https://api.github.com/users/Monine/starred{/owner}{/repo}",
	      "subscriptions_url": "https://api.github.com/users/Monine/subscriptions",
	      "organizations_url": "https://api.github.com/users/Monine/orgs",
	      "repos_url": "https://api.github.com/users/Monine/repos",
	      "events_url": "https://api.github.com/users/Monine/events{/privacy}",
	      "received_events_url": "https://api.github.com/users/Monine/received_events",
	      "type": "User",
	      "site_admin": false
	    },
	    "labels": [

	    ],
	    "state": "open",
	    "locked": false,
	    "assignee": null,
	    "milestone": null,
	    "comments": 0,
	    "created_at": "2016-03-05T15:17:42Z",
	    "updated_at": "2016-03-21T00:55:34Z",
	    "closed_at": null,
	    "body": "- [HTTPS 科普扫盲帖] [1]\r\n\r\n[1]: https://segmentfault.com/a/1190000004523659?f=tt&hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io\r\n'HTTPS 科普扫盲帖'\r\n\r\n  - [和安全有关的那些事(非对称加密、数字摘要、数字签名、数字证书、SSL、HTTPS及其他)] [1-1]\r\n\r\n  [1-1]: http://blog.csdn.net/bluishglc/article/details/7585965\r\n  '和安全有关的那些事'\r\n\r\n  - [OpenSSL 与 SSL 数字证书概念贴] [1-2]\r\n\r\n  [1-2]: http://seanlook.com/2015/01/15/openssl-certificate-encryption/\r\n  'OpenSSL 与 SSL 数字证书概念贴'\r\n\r\n  - [SSL/TLS协议运行机制的概述] [1-3]\r\n  [1-3]:  http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html\r\n  'SSL/TLS协议运行机制的概述'\r\n\r\n- [看淘宝如何做到全站 HTTPS 后不仅更安全而且更快] [2]\r\n\r\n  [2]: http://mp.weixin.qq.com/s?__biz=MzAxNDEwNjk5OQ==&mid=402402866&idx=1&sn=f3fde8ece13d51397c12f1a08713ebeb\r\n  '看淘宝如何做到全站 HTTPS 后不仅更安全而且更快'\r\n\r\n- [HTTPS 初解] [3]\r\n\r\n[3]: http://nathanli.cn/2016/03/18/https_learn_sample/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io\r\n'HTTPS 初解'"
	  },
	  {
	    "url": "https://api.github.com/repos/Monine/study/issues/2",
	    "repository_url": "https://api.github.com/repos/Monine/study",
	    "labels_url": "https://api.github.com/repos/Monine/study/issues/2/labels{/name}",
	    "comments_url": "https://api.github.com/repos/Monine/study/issues/2/comments",
	    "events_url": "https://api.github.com/repos/Monine/study/issues/2/events",
	    "html_url": "https://github.com/Monine/study/issues/2",
	    "id": 138492897,
	    "number": 2,
	    "title": "常用的正则表达式",
	    "user": {
	      "login": "Monine",
	      "id": 8335856,
	      "avatar_url": "https://avatars.githubusercontent.com/u/8335856?v=3",
	      "gravatar_id": "",
	      "url": "https://api.github.com/users/Monine",
	      "html_url": "https://github.com/Monine",
	      "followers_url": "https://api.github.com/users/Monine/followers",
	      "following_url": "https://api.github.com/users/Monine/following{/other_user}",
	      "gists_url": "https://api.github.com/users/Monine/gists{/gist_id}",
	      "starred_url": "https://api.github.com/users/Monine/starred{/owner}{/repo}",
	      "subscriptions_url": "https://api.github.com/users/Monine/subscriptions",
	      "organizations_url": "https://api.github.com/users/Monine/orgs",
	      "repos_url": "https://api.github.com/users/Monine/repos",
	      "events_url": "https://api.github.com/users/Monine/events{/privacy}",
	      "received_events_url": "https://api.github.com/users/Monine/received_events",
	      "type": "User",
	      "site_admin": false
	    },
	    "labels": [

	    ],
	    "state": "open",
	    "locked": true,
	    "assignee": null,
	    "milestone": null,
	    "comments": 0,
	    "created_at": "2016-03-04T14:47:20Z",
	    "updated_at": "2016-04-01T00:52:12Z",
	    "closed_at": null,
	    "body": "内容已转移到 [Worklogs Issues](https://github.com/Monine/Worklogs/issues/2)1"
	  },
	  {
	    "url": "https://api.github.com/repos/Monine/study/issues/1",
	    "repository_url": "https://api.github.com/repos/Monine/study",
	    "labels_url": "https://api.github.com/repos/Monine/study/issues/1/labels{/name}",
	    "comments_url": "https://api.github.com/repos/Monine/study/issues/1/comments",
	    "events_url": "https://api.github.com/repos/Monine/study/issues/1/events",
	    "html_url": "https://github.com/Monine/study/issues/1",
	    "id": 138490990,
	    "number": 1,
	    "title": "关于 如何写代码？",
	    "user": {
	      "login": "Monine",
	      "id": 8335856,
	      "avatar_url": "https://avatars.githubusercontent.com/u/8335856?v=3",
	      "gravatar_id": "",
	      "url": "https://api.github.com/users/Monine",
	      "html_url": "https://github.com/Monine",
	      "followers_url": "https://api.github.com/users/Monine/followers",
	      "following_url": "https://api.github.com/users/Monine/following{/other_user}",
	      "gists_url": "https://api.github.com/users/Monine/gists{/gist_id}",
	      "starred_url": "https://api.github.com/users/Monine/starred{/owner}{/repo}",
	      "subscriptions_url": "https://api.github.com/users/Monine/subscriptions",
	      "organizations_url": "https://api.github.com/users/Monine/orgs",
	      "repos_url": "https://api.github.com/users/Monine/repos",
	      "events_url": "https://api.github.com/users/Monine/events{/privacy}",
	      "received_events_url": "https://api.github.com/users/Monine/received_events",
	      "type": "User",
	      "site_admin": false
	    },
	    "labels": [

	    ],
	    "state": "open",
	    "locked": false,
	    "assignee": null,
	    "milestone": null,
	    "comments": 0,
	    "created_at": "2016-03-04T14:37:53Z",
	    "updated_at": "2016-04-09T08:31:19Z",
	    "closed_at": null,
	    "body": "> 写代码真的是一件非常艺术的活。\r\n\r\n最近因为公司产品 **H5红包** 的业务一直在升级，导致我这边的代码也在不断更新，同时，我对自己以前写的代码也有很多不满意的地方，比如业务逻辑不够清晰、分布散乱、命名不严谨 (不易懂) 等，最重要的是没有做到 **任务模块化**。\r\n\r\n**任务模块化** 是我自己发明的一个名词，大意是说 *每一个函数所处理的任务都应该是独立的模块*，它做的事情应该是在这个阶段必须完成的，既保证前线安全又确保不会给后勤添乱，也就是说，该你完成的事情就必须你来完成，不要取逾越界限，给其他模块造成多余的操作和麻烦。\r\n\r\n意思很简单，相信大多数人都懂，但是在写代码的时候就需要非常清晰的 **大局观**，这种大局观是我们对业务需求的理解透彻的体现。"
	  }
	];

	// $.ajax({
	// 	type: 'GET',
	// 	url: 'https://api.github.com/repos/' + _config.owner + '/' + _config.repo + '/issues?filter=created&page=1&per_page=' + _config.per_page,
	// 	error: function() {

	// 	},
	// 	success: function(result) {

	// 		$('.content').html(getArticleListTpl(result));
	// 	}
	// });


	$('.content').html(getArticleListTpl(_articleList));

	$('.article-list').on('click', 'dd', function() {

		var _this = this;

		var number = parseInt($(_this).attr('data-number'), 10);

		_articleList.forEach(function(item, index, list) {
			if (item.number === number) {
				$('.content').html('<article><h2>' + item.title + '</h2>' + marked(item.body) + '</article>');
			}
		});
	});

	function getArticleListTpl(list) {

		var template = '<dl class="article-list">';
		
		list.forEach(function(item, index, list) {

			var date = new Date(Date.parse(item.created_at));
			var time = date.getFullYear() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getDate();

			var quote = marked(item.body).split('</blockquote>')[0].split('<blockquote>')[1];
			quote? quote = '<blockquote>' + quote.trim() + '</blockquote>' : quote = '<blockquote>这家伙居然没写引言！</blockquote>';

			template += '<dd data-number=' + item.number + '>'
						+ '<h2>' + item.title + '</h2>'
						+ '<em>' + time + '</em>'
						+ quote
						+ '</dd>';
		});

		return template += '</dl>';
	}

})(window, document, jQuery);

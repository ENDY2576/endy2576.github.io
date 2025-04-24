var posts=["2022/10/28/2025-3-1第七篇/","2022/10/29/2025-3-1第三篇/","2022/10/28/2025-3-1第六篇/","2022/10/28/2025-3-1第四篇/","2025/04/01/学会用消费者权益维护自己的利益/","2025/03/09/寒窑赋/","2025/04/01/论文期刊检索网站/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","color":"vip","tag":"技术"},{"name":"Fomalhaut","link":"https://www.fomal.cc/","avatar":"https://www.fomal.cc/assets/avatar.webp","descr":"Future is now","tag":"技术"},{"name":"张洪Heo","link":"https://blog.zhheo.com/","avatar":"https://p.zhheo.com/8DSTSS20990281646044689944.PNG!cover_mini","descr":"分享设计与科技生活","tag":"技术"},{"name":"Akilar","link":"https://akilar.top","avatar":"https://npm.elemecdn.com/akilar-friends@latest/avatar/akilar.top.jpg","descr":"期待您的光临！","tag":"生活"},{"name":"杜老师说","link":"https://dusays.com","avatar":"https://cdn.dusays.com/avatar.png","descr":"师者，传道，授业，解惑！","tag":"技术"},{"name":"小康博客","link":"https://www.antmoe.com/","avatar":"https://cdn.jsdelivr.net/npm/kang-static@latest/avatar.jpg","descr":"一个收藏回忆与分享技术的地方","tag":"技术"},{"name":"小城故事","link":"https://www.webxc.ml","avatar":"https://npm.elemecdn.com/webxc/logo/logo.jpg","descr":"欢迎光临小城故事","tag":"生活"},{"name":"贰猹的小窝","link":"https://noionion.top","avatar":"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg","descr":"用这生命中的每一秒，给自己一个不后悔的未来","tag":"生活"},{"name":"陈YF","link":"https://blog.cyfan.top","avatar":"https://npm.elemecdn.com/chenyfan-cdn@2.0.0/img/avatar.png","descr":"一个在互联网角落挣扎的小小博客","tag":"技术"},{"name":"Tianli","link":"https://tianli-blog.club","avatar":"https://s.nmxc.ltd/sakurairo_vision/@2.6/basic/topavatar.png","descr":"惟其不可能，所以才相信","tag":"技术"},{"name":"呆鱼","link":"https://daiyu.fun","avatar":"https://daiyu.fun/img/avatar.png","descr":"命运之所以称为命运，正是因为它无可改变","tag":"生活"},{"name":"仅安","link":"https://jinan6.vip","avatar":"https://jinan6.vip/img/author.jpg","descr":"温故而知新","tag":"技术"},{"name":"初柒工坊云","link":"https://cloud.firstdyeing.com/","avatar":"https://sourcebucket.s3.bitiful.net/img/chuqi.webp","descr":"首批国家机关云服务供应商，作为行业云的引领者，致力于成为高品质云服务提供商"},{"name":"Akilarの糖果屋","link":"https://akilar.top/","avatar":"https://sourcebucket.s3.bitiful.net/img/akilar.jpg","descr":"期待您的光临！","recommend":true},{"name":"小染Blog","link":"https://www.startly.cn/","avatar":"https://sourcebucket.s3.bitiful.net/img/xiaoqi.webp","descr":"寄言燕雀莫相唣，自有云霄万里高，给时光以生命，给岁月以文明"},{"name":"小城故事","link":"https://www.webxc.ml","avatar":"https://npm.elemecdn.com/webxc/logo/logo.jpg","descr":"欢迎光临小城故事"},{"name":"满心","link":"https://blog.lovelu.top","avatar":"https://blog.lovelu.top/wp-content/uploads/2024/05/mxlogo.png","descr":"满心的个人博客，记录学习历程"},{"name":"贰猹的小窝","link":"https://noionion.top","avatar":"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg","descr":"用这生命中的每一秒，给自己一个不后悔的未来"},{"name":"陈YF","link":"https://blog.cyfan.top","avatar":"https://npm.elemecdn.com/chenyfan-cdn@2.0.0/img/avatar.png","descr":"一个在互联网角落挣扎的小小博客"},{"name":"呆鱼","link":"https://daiyu.fun","avatar":"https://daiyu.fun/img/avatar.png","descr":"命运之所以称为命运，正是因为它无可改变"},{"name":"月落星河","link":"https://blog.justlovesmile.top","avatar":"https://blog.justlovesmile.top/img/avatar.jpg","descr":"浩瀚中的伟大，孤独间的渺小"},{"name":"凌冬","link":"https://blog.coldrain.ink","avatar":"https://blog.coldrain.ink/img/avatar.jpg","descr":"过去不优秀，不代表未来不精彩"},{"name":"清羽飞扬","link":"https://blog.liushen.fun/","avatar":"https://blog.liushen.fun/favicon.ico","descr":"👋🏻我是清扬，一个热爱编程的技术爱好者，喜欢分享经验。😊"},{"name":"颢天","link":"https://www.zouht.com/","avatar":"https://cdn.qyliu.top/i/2024/06/27/667d880789765.webp","descr":"无限进步"},{"name":"Tianli","link":"https://blog.tianli0.top/","avatar":"https://cdn.qyliu.top/i/2024/04/06/66116950412cc.png","descr":"斗罢艰险再出发！"},{"name":"Leonus","link":"https://blog.leonus.cn/","avatar":"https://cdn.qyliu.top/i/2024/04/11/6617da4084197.png","descr":""},{"name":"無名小栈","link":"https://blog.imsyy.top/","avatar":"https://cdn.qyliu.top/i/2024/03/21/65fc59764c0be.png","descr":""},{"name":"星辰日记","link":"https://blog.xsot.cn/","avatar":"https://cdn.qyliu.top/i/2024/05/31/66595f03d46be.png","descr":""},{"name":"星の野","link":"https://blog.byer.top/","avatar":"https://cdn.qyliu.top/i/2024/08/04/66af2ed96cd7d.webp","descr":""},{"name":"山岳库博","link":"https://kmar.top/","avatar":"https://cdn.qyliu.top/i/2024/04/06/66116c3ba58c3.png","descr":""},{"name":"青桔气球","link":"https://blog.qjqq.cn/","avatar":"https://cdn.qyliu.top/i/2024/04/07/661241402f02a.png","descr":""},{"name":"爱吃肉的猫","link":"https://meuicat.com/","avatar":"https://cdn.qyliu.top/i/2024/04/07/66123cff10a83.png","descr":""},{"name":"LINUX DO","link":"https://linux.do/?source=blog_liushen_fun","avatar":"https://cdn.qyliu.top/i/2024/11/11/67321caaa4447.webp","descr":""},{"name":"BlackFlies","link":"https://www.yyyzyyyz.cn/","avatar":"https://cdn.qyliu.top/i/2025/02/16/67b0bd691bf0d.webp","descr":""},{"name":"终成博客","link":"https://blog.zc.wiki/","avatar":"https://cdn.qyliu.top/i/2024/12/25/676bc9f00a819.webp","descr":""},{"name":"星港 Star","link":"https://blog.starsharbor.com","avatar":"https://cdn.qyliu.top/i/2024/08/04/66af3198042a2.webp","descr":""},{"name":"满心记","link":"https://qq.mba/","avatar":"https://cdn.qyliu.top/i/2024/08/04/66af31bec75a0.webp","descr":""},{"name":"webjing","link":"https://blog.webjing.cn/","avatar":"https://cdn.qyliu.top/i/2024/10/31/672397cb5cf03.webp","descr":""},{"name":"June","link":"https://blog.june-pj.cn/","avatar":"https://cdn.qyliu.top/i/2024/03/22/65fc5b18a2574.png","descr":""},{"name":"呓语梦轩","link":"https://blog.awaae001.top","avatar":"https://cdn.qyliu.top/i/2024/03/30/660769346d538.jpg","descr":""},{"name":"Redish101","link":"https://blog.redish101.top/","avatar":"https://cdn.qyliu.top/i/2024/04/07/6612417f11b02.png","descr":""},{"name":"听风小屋","link":"https://blog.ifeng.asia/","avatar":"https://cdn.qyliu.top/i/2024/03/31/6608e2697634c.png","descr":""},{"name":"AlenLiu","link":"https://blog.alenliu.space/","avatar":"https://cdn.qyliu.top/i/2024/03/31/66097a6d9363f.png","descr":""},{"name":"鹊楠","link":"https://blog.quenan.cn","avatar":"https://cdn.qyliu.top/i/2024/04/10/66164fd0e92b6.png","descr":""},{"name":"obaby","link":"https://h4ck.org.cn/","avatar":"https://cdn.qyliu.top/i/2024/04/15/661d443b5359c.png","descr":""},{"name":"刘郎阁","link":"https://vjo.cc/","avatar":"https://cdn.qyliu.top/i/2024/04/19/66229406a68df.png","descr":""},{"name":"葱苓 sama","link":"https://blog.ciraos.top/","avatar":"https://cdn.qyliu.top/i/2024/05/03/663458df4e6f0.png","descr":""},{"name":"纸鹿本鹿","link":"https://blog.zhilu.cyou","avatar":"https://cdn.qyliu.top/i/2024/06/02/665c869ded7cd.png","descr":""},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://cdn.qyliu.top/i/2024/08/02/66acfd1f993ce.webp","descr":""},{"name":"朽丘博","link":"https://blog.koxiuqiu.cc/","avatar":"https://cdn.qyliu.top/i/2024/08/20/66c41c9c45e2a.webp","descr":""},{"name":"湘铭","link":"https://xiangming.site/","avatar":"https://cdn.qyliu.top/i/2024/04/19/6622928fc416c.png","descr":""},{"name":"凉心","link":"https://www.lxink.cn/","avatar":"https://cdn.qyliu.top/i/2024/05/24/66500d797ac38.png","descr":""},{"name":"往日信笺","link":"https://www.xingmail.cn/","avatar":"https://cdn.qyliu.top/i/2024/04/14/661bf476a6d8d.png","descr":""},{"name":"Ariasaka","link":"https://blog.yaria.top/","avatar":"https://cdn.qyliu.top/i/2024/04/09/6614f40b65114.png","descr":""},{"name":"Chlorine","link":"https://www.yoghurtlee.com/","avatar":"https://cdn.qyliu.top/i/2024/08/07/66b2daf9ab79f.webp","descr":""},{"name":"短巷与雨","link":"https://www.hudi.space/","avatar":"https://cdn.qyliu.top/i/2024/11/18/673ac90233753.webp","descr":""},{"name":"雾林博客","link":"https://www.baiwulin.com/","avatar":"https://cdn.qyliu.top/i/2024/08/02/66ac3b75826cb.webp","descr":""},{"name":"银河星港","link":"https://starsdock.com/","avatar":"https://cdn.qyliu.top/i/2025/02/26/67bec7d0eb734.webp","descr":""}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };
var posts=["2022/10/28/2025-3-1第七篇/","2022/10/29/2025-3-1第三篇/","2022/10/28/2025-3-1第六篇/","2022/10/28/2025-3-1第四篇/","2025/04/01/学会用消费者权益维护自己的利益/","2025/03/09/寒窑赋/","2025/04/01/论文期刊检索网站/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","color":"vip","tag":"技术"},{"name":"Fomalhaut","link":"https://www.fomal.cc/","avatar":"https://www.fomal.cc/assets/avatar.webp","descr":"Future is now","tag":"技术"},{"name":"张洪Heo","link":"https://blog.zhheo.com/","avatar":"https://p.zhheo.com/8DSTSS20990281646044689944.PNG!cover_mini","descr":"分享设计与科技生活","tag":"技术"},{"name":"Akilar","link":"https://akilar.top","avatar":"https://npm.elemecdn.com/akilar-friends@latest/avatar/akilar.top.jpg","descr":"期待您的光临！","tag":"生活"},{"name":"杜老师说","link":"https://dusays.com","avatar":"https://cdn.dusays.com/avatar.png","descr":"师者，传道，授业，解惑！","tag":"技术"},{"name":"小康博客","link":"https://www.antmoe.com/","avatar":"https://cdn.jsdelivr.net/npm/kang-static@latest/avatar.jpg","descr":"一个收藏回忆与分享技术的地方","tag":"技术"},{"name":"小城故事","link":"https://www.webxc.ml","avatar":"https://npm.elemecdn.com/webxc/logo/logo.jpg","descr":"欢迎光临小城故事","tag":"生活"},{"name":"贰猹的小窝","link":"https://noionion.top","avatar":"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg","descr":"用这生命中的每一秒，给自己一个不后悔的未来","tag":"生活"},{"name":"陈YF","link":"https://blog.cyfan.top","avatar":"https://npm.elemecdn.com/chenyfan-cdn@2.0.0/img/avatar.png","descr":"一个在互联网角落挣扎的小小博客","tag":"技术"},{"name":"Tianli","link":"https://tianli-blog.club","avatar":"https://s.nmxc.ltd/sakurairo_vision/@2.6/basic/topavatar.png","descr":"惟其不可能，所以才相信","tag":"技术"},{"name":"呆鱼","link":"https://daiyu.fun","avatar":"https://daiyu.fun/img/avatar.png","descr":"命运之所以称为命运，正是因为它无可改变","tag":"生活"},{"name":"仅安","link":"https://jinan6.vip","avatar":"https://jinan6.vip/img/author.jpg","descr":"温故而知新","tag":"技术"},{"name":"仅安","link":"https://jinan6.vip","avatar":"https://jinan6.vip/img/author.jpg","descr":"温故而知新","tag":"技术"},{"name":"仅安","link":"https://jinan6.vip","avatar":"https://jinan6.vip/img/author.jpg","descr":"温故而知新","tag":"技术"},{"name":"仅安","link":"https://jinan6.vip","avatar":"https://jinan6.vip/img/author.jpg","descr":"温故而知新","tag":"技术"},{"name":"初柒工坊云","link":"https://cloud.firstdyeing.com/","avatar":"https://sourcebucket.s3.bitiful.net/img/chuqi.webp","descr":"首批国家机关云服务供应商，作为行业云的引领者，致力于成为高品质云服务提供商"},{"name":"Akilarの糖果屋","link":"https://akilar.top/","avatar":"https://sourcebucket.s3.bitiful.net/img/akilar.jpg","descr":"期待您的光临！","recommend":true},{"name":"小染Blog","link":"https://www.startly.cn/","avatar":"https://sourcebucket.s3.bitiful.net/img/xiaoqi.webp","descr":"寄言燕雀莫相唣，自有云霄万里高，给时光以生命，给岁月以文明"},{"name":"小城故事","link":"https://www.webxc.ml","avatar":"https://npm.elemecdn.com/webxc/logo/logo.jpg","descr":"欢迎光临小城故事"},{"name":"满心","link":"https://blog.lovelu.top","avatar":"https://blog.lovelu.top/wp-content/uploads/2024/05/mxlogo.png","descr":"满心的个人博客，记录学习历程"},{"name":"贰猹的小窝","link":"https://noionion.top","avatar":"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg","descr":"用这生命中的每一秒，给自己一个不后悔的未来"},{"name":"陈YF","link":"https://blog.cyfan.top","avatar":"https://npm.elemecdn.com/chenyfan-cdn@2.0.0/img/avatar.png","descr":"一个在互联网角落挣扎的小小博客"},{"name":"呆鱼","link":"https://daiyu.fun","avatar":"https://daiyu.fun/img/avatar.png","descr":"命运之所以称为命运，正是因为它无可改变"},{"name":"月落星河","link":"https://blog.justlovesmile.top","avatar":"https://blog.justlovesmile.top/img/avatar.jpg","descr":"浩瀚中的伟大，孤独间的渺小"},{"name":"凌冬","link":"https://blog.coldrain.ink","avatar":"https://blog.coldrain.ink/img/avatar.jpg","descr":"过去不优秀，不代表未来不精彩"}];
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
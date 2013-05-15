---
layout: post
title: How I built my blog in one day
category: Coding
tags: jekyll bootstrap github disqus
year: 2012
month: 3
day: 8
published: true
summary: A tutorial on how I built my blog
image: post_one.jpg
---

<div class="row">	
	<div class="span9 columns">
	  <h2>Preface</h2>
	  <p>How I did this blog is nothing new, as a matter of fact many have done exactly what I did and it is well documented. This post is just on how I did it and since it is all very fresh in my mind I thought I would write a post about it.  For other tutorials on how to do this checkout these:</p>  	  
	  <ul>
		<li><a href="http://jekyllbootstrap.com/" target="_blank">jekyllbootstrap</a></li>
		<li><a href="https://github.com/mojombo/jekyll/wiki" target="_blank">mojombo/jekyll</a></li>
	  </ul>
	  <p><a href="http://news.ycombinator.com/item?id=3679495" target="_blank" title="Read what others are saying on news.ycombinator right now">Read what others are saying</a> on news.ycombinator.</p>
	  <hr>	  
	  <h2>GitHub</h2>
	  <p>I choose to use GitHub to host the blog using the GitHub Pages feature by creating a repository using my GitHub username.</p>  
	  <ul>
	    <li>Setup a free <a href="https://github.com/signup/free" target="_blank">GitHub</a> account, and follow the <a href="http://help.github.com/win-set-up-git/" target="_blank">setup instructions</a>.</li>		
		<li>Create a <a href="http://pages.github.com/" target="_blank">GitHub Page</a> with your username.</li>		
	  </ul>
	  <p>It may take a little while for GitHub to setup your page but eventually it will start working and you'll have your GitHub page and an empty repository.</p>
	  <hr>
	  <h2>Jekyll</h2>
	  <p><a href="http://jekyllrb.com/" target="_blank" title="Go to Jekyll">Jekyll</a> is a static site generator.  It is fairly easy to work with and it will allow you to create your blogs (each as a file) and it will know how to plug in simple blog aware properties.</p>
	  <h2><small>Get some code</small></h2>
	  <p>To get started here I went the typical <i>lazy route</i> and ripped down a friends GitHub page that was using Jekyll.  So feel free to <a href="https://github.com/erjjones/erjjones.github.com/zipball/master">rip down my GitHub page</a> if you wish or <a href="https://github.com/erjjones/erjjones.github.com" target="_blank">fork my GitHub page</a>.  I'm sure the tutorials that are mentioned at the top of this blog go into great detail on how to <code>rake</code> everything together but I don't always roll that way so to each his own here on this step.</p>
	  <h2><small>You reap what you sow</small></h2>
	  <p>Next I copied the files into my repository and started looking around to see how it was put together.  Since I like to dive into things without much reading I was quickly confused how to get the site to load on my local machine.  Luckily for you I have figured that out ... after asking my buddy of course!</p>
	  <h2><small>Install Ruby and Jekyll</small></h2>
	  <p><strong>Open a GitBash window</strong> and get the latest version of Ruby.</p>
	  <p><pre><code>gem update --system</code></pre></p>
	  <p><strong>Next</strong> install Jekyll</p>
	  <p><pre><code>gem install jekyll</code></pre></p>	  
	  <h2><small>Spin up a Jekyll Server</small></h2>
	  <p><strong>Open a GitBash window</strong> and navigate to the directory of your GitHub pages repository</p>
	  <p><pre><code>cd c:/username.github.com</code></pre></p>
	  <p><pre><code>jekyll --server</code></pre></p>
	  <p>This will fire up a local server that will serve up your blog while you are working locally.  You should be able to navigate to something like <i>localhost:4000</i>.  As long as you leave this GitBash window open you'll have the server running at that port to test your code locally.</p>
	  <p>...<i>more on Jekyll a bit later</i></p>
	  <hr>
	  <h2>Twitter Bootstrap</h2>
	  <p>Love it or hate it Twitter Bootstrap is undeniably one of the best web frameworks out on the web.  I used Twitter Bootstrap to style my blog site because it is free, already packaged up and ready to go, well documented, it looks good, and it has everything that I needed.</p>	  
	  <br/>
	  <blockquote>
		<p>When normal sense makes good sense, seek no other sense.</p>
		<small>Chris Philbeck</small>
	  </blockquote>	  
	  <h2><small>Download Twitter Bootstrap</small></h2>
	  <ul>	    
		<li><a href="http://twitter.github.com/bootstrap/assets/bootstrap.zip" title="Click to download Twitter Bootstrap"> Download Twitter Bootstrap </a></li>
	   	<li><a href="http://twitter.github.com/bootstrap/" title="Go to Twitter Bootstrap" target="_blank">Twitter Bootstrap</a> is well documented and has good examples on how to implement the various components.</li>
	  </ul>	  
	  <h2><small>Cherry Pick What You Want</small></h2>
	  <p>After you have the Twitter Bootstrap files you can pick and choose what you want.  You may not want all of the images and example css files.  I took most of the css files and put them in my own folder called css.  I also grabbed the images and icons and put them in a new folder for images.  If you reuse doc.css you'll want to open it and change the file path to the background image or comment that line of code out.  Otherwise you'll get a file not found.</p>	  
	  <pre><code>/*background-image: url(../img/grid-18px-masked.png);*/</code></pre>
	  <p class="muted"><strong>*</strong> If you have pulled down my code you won't need to do this section.  I have already plugged Twitter Bootstrap into my repository.</p>	  
	  <hr>
	  <h2>Feedback Button</h2>
	  <p>I got this feedback idea from <a href="http://zachholman.com/" title="Go to Zach Holmans blog" target="_blank">Zach Holman</a>.</p>
	  <ul>	    
		<li>Create a repository in your GitHub account called <strong>Feedback</strong>.</li>
	   	<li>Create a button that links to the <i>new</i> issue section of that repository.</li>
	  </ul>	
	  <p>Now followers can leave you feedback and you can manage it accordingly.</p>
	  <p><a class="btn btn-mini btn-info" href="https://github.com/erjjones/Feedback/issues/new" title="Leave Erjjones feedback using GitHub" target="_blank"><i class="icon-comment icon-white"></i> Leave me feedback</a></p>
	  <hr>
	  <h2>Dynamic GitHub Followers and Repository Buttons</h2>
	  <p>I wanted to have a button with my number of GitHub followers and GitHub repositories that was dynamic.  GitHub provides an api of each users information <code>https://api.github.com/users/erjjones</code>.  Try it out with your GitHub username in place of mine.  <strong>Open a browser</strong> and paste it in the address bar.</p>
	  <h2><small>Cross Domain Problems</small></h3>
	  <p>Locally I was able to get the Ajax call to the api to work just fine.  However, as soon as I pushed my code to GitHub, no go.  This is when I discovered that I was having a classic case of cross domain problems.</p>
	  <script src="https://gist.github.com/1996394.js"> </script>
	  <p>I work with some super smart guys and gals and as soon as I explained my issue they immediately knew the problem and resolution.</p>
	  <br/>
	  <h2><small>JSONP to the Rescue</small></h2>
	  <p>Fortunately <a href="http://developer.github.com/v3/#json-p-callbacks" title="Go to GitHub Api documentation" target="_blank">GitHub supports JSONP callbacks</a> and I found a <a href="https://gist.github.com/" target="_blank" title="Go to more information about what a Gist is">Gist</a> by another developer that I was able to tweak to achieve my end result.</p>
	  <script src="https://gist.github.com/1996286.js"> </script>
	  <p>Problem solved and now I have dynamic GitHub follower and GitHub repository buttons.</p>
	  <p><a class="btn btn-success btn-mini" id="gf" href="https://github.com/erjjones/followers" title="Go to Erjjones GitHub followers page" target="_blank"></a>&nbsp;<a class="btn btn-success btn-mini" id="gfr" href="https://github.com/erjjones/repositories" title="Go to Erjjones GitHub repositories page" target="_blank"></a></p>
	  <hr>
	  <h2>Social Buzz Widgets</h2>
	  <p>In order to track how each post is doing in the world of social media I added three social widgets: Twitter, Google+ and Reddit.</p>
	  <h2><small>Twitter Widget</small></h2>	
	  <p>This is probably the most documented and well understood widget.  Go to the <a href="https://dev.twitter.com/docs/twitter-for-websites" title="Go to the Twitter Developer documentation" target="_blank">Twitter Developer's page</a> to get more information.</p>
	  <script src="https://gist.github.com/1996683.js"> </script>
	  <p>Just replace your Twitter username with mine and you are good to go.</p>
	  <p><a href="https://twitter.com/share" class="twitter-share-button" data-via="erjjones">Tweet</a></p>
	  <br/>
	  <h2><small>Google+ Widget</small></h2>	
	  <p>For the Google Plus widget I don't have it hooked up to my Google+ account.  This widget is really easy to plug and play into your page and will track just the page.  Go to the <a href="http://www.google.com/webmasters/+1/button/" target="_blank" title="Go to Google Plus documentation">Google Plus button documentation</a> to learn more about this button.</p>
	  <script src="https://gist.github.com/1996731.js"> </script>
	  <br/>
	  <p><g:plusone size="medium"></g:plusone></p>	
	  <br/>
	  <h2><small>Reddit Widget</small></h2>	
	  <p>I am not a big Reddit guy (yet) so we'll see how this goes.  Never the less I added the Reddit widget fairly easily and because of Jekyll I can populate the URL to the blog dynamically.  Go to the <a href="http://www.reddit.com/buttons/" target="_blank" title="Go to Reddit button documentation">Reddit button documentation</a> to learn more.</p>
	  <p>By placing <code>&#123;&#123; page.url &#125;&#125;</code> Jekyll will put the url to the page.</p>
	  <script src="https://gist.github.com/1996827.js"> </script>
	  <br/>
	  <p><script type="text/javascript" src="http://www.reddit.com/buttonlite.js?i=2&styled=off&url=http://erjjones.github.com{{ page.url }}&newwindow=1"></script></p> 	  
	  <hr>
	  <h2>Disqus</h2>
	  <p>To me it made perfect sense to use <a href="http://disqus.com/" target="_blank" title="Go to Disqus">Disqus</a> as a comments provider.  As far as I can tell lots of sites are using this provider so we'll see how it goes.  When you setup an account Disqus will have you setup a <i>shortname</i> that you will use in your Disqus widget code.  The <i>Admin</i> tools in Disqus will allow you to delete comments and set a list of blackout words.</p>	  
	  <h2><small>Total Comments</small></h2>	
	  <p>To get the <a href="http://erjjones.github.com{{ page.url }}#disqus_thread" data-disqus-identifier="{{ page.url }}"></a> you can put the following code anywhere on your page or any other page as long as you use the url you would like and have the Disqus Widget code on your page, it just works.</p>
	  <p><pre><code>&lt;a href="http://erjjones.github.com&#123;&#123; page.url &#125;&#125;#disqus_thread" data-disqus-identifier="&#123;&#123; page.url &#125;&#125;"&gt;&lt;/a&gt;</code></pre></p>	  
	  <h2><small>Disqus Widget Code</small></h3>	
	  <script src="https://gist.github.com/1998023.js"> </script>
	  <hr>
	  <h2>Jekyll Continued</h2>
	  <h2><small>Pages and Properties</small></h2>	
	  <p>Using Jekyll you save your blog posts as <code>.markdown</code> files which contain a header section like the code sample below and html, css, javascript, etc.</p>
	  <script src="https://gist.github.com/1998470.js"> </script>
	  <p>To create the header of every blog post I simply <i>include</i> a template header that has the following properties set.</p>	
	  <p><pre><code>&lt;h4&gt;&lt;strong&gt;&#123;&#123; page.date | date: "%B %e, %Y" &#125;&#125; &lt;small&gt;. &#123;&#123; page.category &#125;&#125; .&lt;/small&gt; &#123;&#123; page.title &#125;&#125;&lt;/strong&gt;&lt;/h4&gt;</code></pre></p>	  
	  <h4><strong>{{ page.date | date: "%B %e, %Y" }} <small>. {{ page.category }} .</small> {{ page.title }}</strong></h4>
	  <br/>
	  <h2><small>Listing all your posts</small></h2>	
	  <p>On the home page I list all of the blog posts.  The code below will allow you to list all of your posts in the <code>_posts</code> folder.  By naming the .markdown files with the date in the file name like <code>2012-03-08-How-I-built-my-blog.markdown</code></p>	
	  <script src="https://gist.github.com/1998382.js"> </script>	  
	  <br/>
	  <h2><small>Paging</small></h3>	
	  <p>Ideally this blog would take on the characteristics of a blogazine like feel.  One way I try to achieve that is through pagination.  On the top of each of the blogs I use <i class="icon-chevron-left"></i><i class="icon-chevron-right"></i> and <a href="#" title="Previous Post: {{page.previous.title}}">&laquo; Previous Blog Post</a> | <a href="#" title="Next Post: {{page.next.title}}">Next Blog Post &raquo; </a> at the bottom.</p>	  
	  <script src="https://gist.github.com/1998418.js"> </script>
	  <hr>
	  <h2>Instapaper</h2>
	  <p>Adding an <a href="http://www.instapaper.com" target="_blank" title="Go to Instapaper">Instapaper</a> link is just another piece of functionality to enhance integration with other web tools.  All you need to do is build the link below and add your <i>url</i> and <i>title</i>.</p>	
	  <p><pre><code>http://www.instapaper.com/hello2?url=http://erjjones.github.com&#123;&#123; page.url &#125;&#125;&title=&#123;&#123; page.title &#125;&#125;</code></pre></p>
	  <p><a href="http://www.instapaper.com/hello2?url=http://erjjones.github.com{{ page.url }}&title={{ page.title }}" title="Save {{ page.title }} to Instapaper" target="_blank">Read later</a></p>
	  <hr>	  
	  <h2>Y Combinator Submit Icon</h2>
	  <p><a href="http://news.ycombinator.com/" target="_blank" title="Go to news.ycombinator.com">Y Combinator</a> is my all time favorite news feed and adding a Y Combinator submit option just seemed right.  All you need to do is build the link below and add your <i>url</i> and <i>title</i>.</p>	
	  <p><pre><code>http://news.ycombinator.com/submitlink?u=http://erjjones.github.com&#123;&#123; page.url &#125;&#125;&t=&#123;&#123; page.title &#125;&#125;</code></pre></p>
	  <p><a href="http://news.ycombinator.com/submitlink?u=http://erjjones.github.com{{ page.url }}&t={{ page.title }}" target="_blank"><img src="/img/yc500.gif" title="Submit {{ page.title }} to Hacker News" /></a></p>
	  <hr>		  	  	  
	  <h2>In Conclusion</h2>
	  <p>I hope this sparks you to try out GitHub, Jekyll, Twitter Bootstrap and other open source web resources.  I have just begun to scratch the surface here and this blog doesn't attempt to cover all of details but I would like to hear what other cool integrations people are doing on their blogs.</p>	  
	  <hr>
	</div>
</div> 

<div class="row">	
	<div class="span9 column">
			<p class="pull-right">{% if page.previous.url %} <a href="{{page.previous.url}}" title="Previous Post: {{page.previous.title}}"><i class="icon-chevron-left"></i></a> 	{% endif %}   {% if page.next.url %} 	<a href="{{page.next.url}}" title="Next Post: {{page.next.title}}"><i class="icon-chevron-right"></i></a> 	{% endif %} </p>  
	</div>
</div>

<div class="row">	
    <div class="span9 columns">    
		<h2>Comments Section</h2>
	    <p>Feel free to comment on the post but keep it clean and on topic.</p>	
		<div id="disqus_thread"></div>
		<script type="text/javascript">
			/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
			var disqus_shortname = 'ericjones'; // required: replace example with your forum shortname
			var disqus_identifier = '/blog/How-I-built-my-blog-in-one-day';
			var disqus_url = '/blog/How-I-built-my-blog-in-one-day';
			
			/* * * DON'T EDIT BELOW THIS LINE * * */
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
		</script>
		<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
		<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>
	</div>
</div>

<!-- Twitter -->
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<!-- Google + -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
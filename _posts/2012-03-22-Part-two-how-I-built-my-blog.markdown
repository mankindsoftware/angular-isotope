---
layout: post
title: Part two on how I built my blog
category: Coding
tags: jekyll github rss
year: 2012
month: 3
day: 22
published: true
summary: A follow up post on how I built my blog
image: post_two.jpg
---

<div class="row">
	<div class="span9 columns">
	  <h2>Preface</h2>
	  <p>This is a follow up from my last post <a href="http://erjjones.github.com/blog/How-I-built-my-blog-in-one-day/" title="Go to How I built my blog in one day"><i>How I built my blog in one day</i></a>.  There were several items I left out and several more that I have refined.  This blog still only begins to scratch the surface on what someone can do with Jekyll and bootstraping other technologies, so please comment and share your ideas.</p>  	 	  
	  <p><a href="https://github.com/erjjones/erjjones.github.com/zipball/master" class="btn btn-info">Download source</a></p>
	  <hr>	  
	  <h2>Jekyll</h2>	  
	  <h2><small>Post Configuration</small></h2>
	  <p><a href="http://jekyllrb.com/" title="Go to Jekyll" target="_blank">Jekyll</a> provides various configuration attributes that you can specify on your post to use those value/pairs later with referring back to a post or iterating through your posts (aka <a href="http://yaml.org/" title="Go to YAML.org" target="_blank">YAML</a> Front-Matter).  I have added several new post properties: year, date, day, tags, published, summary.  For more information about what each property is and how it works <a href="https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter" title="Go to the Jekyll docs" target="_blank">view the Jekyll documentation</a>.</p>
	  <script src="https://gist.github.com/2155346.js"> </script>
	  <h2><small>Tag Pages</small></h2>
	  <p>You will need to create two new files:</p>
	  <ul>
		<li><stron>tag_gen.rb</strong> - Create this in the _plugins folder</li>
		<li><stron>tag_index.html</strong> - Create this in the _layouts folder</li>
	  </ul>
	  <p><strong>tag_gen.rb</strong> is a Jekyll module that will create the static web pages that will list the posts affiliated with the tag.</p>	  
	  <script src="https://gist.github.com/2155135.js"></script>	  
	  <br/>
	  <p><strong>tag_index.html</strong> is a Jekyll layout that will display the posts on the tag page.</p>	  
	  <script src="https://gist.github.com/2155150.js"></script>
	  <br/>
	  <p><strong>Generate the tag pages</strong> - The Jekyll module tag_gen.rb will generate a "tags" folder in the "_site" directory.  The module will also generate subfolders for each tag listed on the posts.  If you add new tags you'll have to build again or stop and start your Jekyll server. For GitHub user pages you will want to copy the "tags" folder from the "_site" folder into the root folder inline with "_site".  See <a href="https://github.com/erjjones/erjjones.github.com" title="Go to https://github.com/erjjones/erjjones.github.com" target="_blank">my GitHub user page repo</a> layout to understand more.</p>	  
	  <h2><small>Tag Lists</small></h2>
	  <p>List all tags within your site.</p>	  
	  <ul>
		{% for tag in site.tags %}		
			<li><a href="/tags/{{ tag[0] }}">{{ tag[0] }}</a></li>
		{% endfor %}
	  </ul>
	  <script src="https://gist.github.com/2155275.js"></script>
	  <p>List all tags for a post.</p>	  
	  <p><small><i class="icon-tags"></i> {% for tag in page.tags %} <a href="/tags/{{ tag }}" title="View posts tagged with &quot;{{ tag }}&quot;"><u>{{ tag }}</u></a>  {% if forloop.last != true %} {% endif %} {% endfor %} </small></p>
	  <script src="https://gist.github.com/2155281.js"></script>	  
	  <hr>
	  <h2>Disqus</h2>
	  <h2><small>Issues fixed</small></h2>
	  <p>On my previous post I hadn't quite worked out all the bugs and I guess a developer never truely does.  However, the comment counts on the home page and the post never populated and I have figured out why.</p>
	  <ol>
		<li>In the script configuration I had forgotten to add the disqus_identifier and disqus_url.</li>
		<li>In the link I had forgotten to include the data-disqus-identifier and set it to the page url.</li>
	  </ol>
	  <script src="https://gist.github.com/2026102.js"> </script>
	  <hr>	  
	  <h2>RSS Feed</h2>
	  <p>Initially when using a GitHub user page I thought that I could use <code>https://github.com/erjjones.atom</code> to hook up my RSS feed on <a href="http://feedburner.google.com" title="Go to feedburner.google.com">feed burner</a>, but I had a hard time getting Feed Burner to register it.  I noticed on <a href="http://zachholman.com/" title="Go to Zach Holmans site">Zach Holman's</a> user page he had a <code>atom.xml</code> file and after further review you see that it is configured to register exactly what I needed to setup the RSS feed.  Save this file to the root directory of your site and then you can register something like <code>http://erjjones.github.com/atom.xml</code> to feed burner and now you have an RSS feed for your blog.</p>
	  <script src="https://gist.github.com/2026283.js"></script>
	  <hr>
	  <h2>README (.md)</h2>
	  <p>Save your README file to README.md.</p>
	  <script src="https://gist.github.com/2026341.js"></script>
	  <hr>
	  <h2>Other Tips</h2>
	  <ul>
		<li><strong>Google Analytics</strong> - Hook up <a href="http://www.google.com/analytics/" title="Go to Google Analytics" target="_blank">Google Analytics</a> you'll be amazed.</li>
		<li><strong>Favicon</strong> - Found a <a href="http://www.favicon.cc/" title="Go to favicon" target="_blank">quick and easy site</a> to generate a favicon.ico.</li>
		<li><strong>Flattr</strong> - <a href="http://flattr.com/" title="Go to flattr" target="_blank">Flattr</a> is Social Micro Payments, it is a way to support stuff you like on the web.</li>
		<li><strong>Hacker News Link</strong> - If you submit your article to <a href="http://news.ycombinator.com/" title="Go to Hacker News" target="_blank">Hacker News</a> put a link on your post to the article on Hacker News.</li>
	  </ul>
	  <hr>
	  <h2>In Conclusion</h2>
	  <p>Again, I hope this sparks you to try out GitHub, Jekyll, Twitter Bootstrap and other open source web resources.  I have just begun to scratch the surface here and this blog doesn't attempt to cover all of details but I would like to hear what other cool integrations people are doing on their blogs.</p>	  
	  <hr>
	</div>
</div> 

<div class="row">
	<div class="span3 columns">&nbsp;</div>
	<div class="span6 column">
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
			var disqus_identifier = '{{ page.url }}';
			var disqus_url = 'http://erjjones.github.com{{ page.url }}';
			
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
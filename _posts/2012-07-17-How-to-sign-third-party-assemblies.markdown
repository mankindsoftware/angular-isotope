---
layout: post
title: How to sign third party assemblies without compiling
category: Coding
tags: dotnet 
year: 2012
month: 7
day: 17
published: true
summary: You do it once in a blue moon so here is a reminder for how to sign that third party assembly you added.
image: post_three.jpg
---

<div class="row">	
	<div class="span9 columns">
	  <h2>Preface</h2>
	  <p>So you added a third party dll to your project and now you need to sign it.  Sometimes you might not have the code to modify the assembly and add your strong name key.  This post will describe how you can go about signing a third party assembly without compiling the code.</p>
	  <p><a href="http://www.microsoft.com/en-us/download/details.aspx?id=19988" alt="Go to Microsoft Download Center" class="btn btn-info" target="_blank">Download .NET Framework 2.0</a></p>
		<h2>Create a Strong Name Key</h2>
		<p>First you'll need to get your existing strong name key (.snk) or <a href="http://msdn.microsoft.com/en-us/library/6f05ezxy(v=vs.71).aspx" alt="Go to Microsoft and read more" target="_blank">create a strong name key</a></p>
		<h2>Use Ildasm to Sign a Third Party Assembly</h2>
		<p>I choose to use <a href="http://msdn.microsoft.com/en-us/library/f7dy01k1(v=vs.80).aspx" target="_blank" alt="Go to MSFT Ildasm">Microsoft intermediate language Disassembler</a> (Ildasm) after having issues with <a href="http://msdn.microsoft.com/en-us/library/c405shex.aspx" alt="Go to MSDN to read more" target="_blank">Assembly Linker</a> so go and download <a href="http://www.microsoft.com/en-us/download/details.aspx?id=19988" alt="Go to Microsoft to download and read more" target="_blank">.Net Framework 2.0</a> from Microsoft if you don't already have it.</p>
		<h2>First Disassemble the ThirdParty.dll</h2>
		<p>Open a Visual Studio Command Prompt and type the following command:</p>
		<p><pre><code>D:\Common\ThirdParty>ildasm /all /out=ThirdParty.il ThirdParty.dll</code></pre></p>
		<p>This will create a file called ThirdParty.il which will be used next to sign and build.</p>
		<h2>Second Rebuild and Sign the ThirdParty.dll</h2>
		<p>Rename or backup your original third party assembly. Open a Visual Studio Command Prompt and type the following command:</p>		
		<p><pre><code>D:\Common\ThirdParty>ilasm /dll /key=YourKey.snk ThirdParty.il</code></pre></p>				
		<h2>Finally Verify Assembly was Signed</h2>
		<p>You'll want to verify that your assembly is now signed.  To do this Open an Visual Studio Command Prompt and type the following command:</p>
		<p><pre><code>sn -vf ThirdParty.dll</code></pre></p>
		<p>You should get an output similar to..</p>
		<p><pre><code>Assembly 'ThirdParty.dll' is valid</code></pre></p>
		<h2>Conclusion</h2>
		<p>This is certainly happy path and only works with assemblies built using .NET libraries.  If other libraries are included in the assembly you are trying to sign then you'll have to do some additional steps not listed on this post.</p>
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
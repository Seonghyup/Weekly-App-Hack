# I couldn't set directories as prerequisites, so run "make dirs all" the first time 
# Set the variable DEBUG to disable minification

BUILDAPPDIR := buildapp
BUILDPKGDIR := buildpkg
appid = com.example.popupdemo

$(info BUILDAPPDIR is $(BUILDAPPDIR))
$(info appid is $(appid))

appsrc :=	PopupDemoApp/depends.js \
			PopupDemoApp/src/HelpDialog.js \
			PopupDemoApp/src/Main.js \
			PopupDemoApp/shimDashboard/depends.js \
			PopupDemoApp/shimDashboard/ShimDashboard.js \
			PopupDemoApp/popup/depends.js \
			PopupDemoApp/popup/DemoPopup.js

$(info appsrc is $(appsrc))

minif :=	$(patsubst PopupDemoApp/%.js, $(BUILDAPPDIR)/%.js, $(appsrc)) \
			$(patsubst PopupDemoApp/%.css, $(BUILDAPPDIR)/%.css, $(wildcard PopupDemoApp/style/*.css)) \
			$(patsubst PopupDemoApp/%.css, $(BUILDAPPDIR)/%.css, $(wildcard PopupDemoApp/shimDashboard/*.css)) \
			$(patsubst PopupDemoApp/%.css, $(BUILDAPPDIR)/%.css, $(wildcard PopupDemoApp/popup/*.css))

copyfiles   := $(BUILDAPPDIR)/index.html $(BUILDAPPDIR)/shimDashboard/shimDashboard.html $(BUILDAPPDIR)/popup/demoPopup.html \
               $(patsubst PopupDemoApp/configuration/db/kinds/%,$(BUILDAPPDIR)/configuration/db/kinds/%,$(wildcard PopupDemoApp/configuration/db/kinds/*)) \
               $(patsubst PopupDemoApp/configuration/db/permissions/%,$(BUILDAPPDIR)/configuration/db/permissions/%,$(wildcard PopupDemoApp/configuration/db/permissions/*)) \
               $(patsubst PopupDemoApp/images/%.png,$(BUILDAPPDIR)/images/%.png,$(wildcard PopupDemoApp/images/*.png)) \
               $(patsubst PopupDemoApp/images/%.png,$(BUILDAPPDIR)/images/%.png,$(wildcard PopupDemoApp/images/support/*.png))


.PHONY : all install run clean distclean

all : standard-ipk

dirs :
	-mkdir $(BUILDAPPDIR)
	-mkdir $(BUILDAPPDIR)/shimDashboard
	-mkdir $(BUILDAPPDIR)/popup
	-mkdir $(BUILDAPPDIR)/src
	-mkdir $(BUILDAPPDIR)/style
	-mkdir $(BUILDAPPDIR)/configuration
	-mkdir $(BUILDAPPDIR)/configuration/db
	-mkdir $(BUILDAPPDIR)/configuration/db/kinds
	-mkdir $(BUILDAPPDIR)/configuration/db/permissions
	-mkdir $(BUILDAPPDIR)/images
	-mkdir $(BUILDAPPDIR)/images/support


# App source files are copied for debug builds and minified for production builds.
# If your development environment includes Miller's JavaScript Lint, uncomment the jsl line.
# If your development environment includes YUI, uncomment the #ifdef lines and the grep line.
$(BUILDAPPDIR)/%.js : PopupDemoApp/%.js
#ifdef DEBUG
	cp -p $< $@
#else
#	grep -v -E "this\.log\b" $< | java -jar ~/webOS/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar --type js --charset utf-8 --preserve-semi -o $@
#	jsl -conf jsl-Enyo-emptyok.conf -nologo -nofilelisting -process $@
#endif

# Configurator files are JSON.
$(BUILDAPPDIR)/configuration/% : PopupDemoApp/configuration/%
	cp -p $< $@

$(BUILDAPPDIR)/images/% : PopupDemoApp/images/%
	cp -p $< $@

# Always minifies CSS.
# If your development environment includes YUI, delete the cp line and uncomment the java line.
$(BUILDAPPDIR)/%.css : PopupDemoApp/%.css
	cp -p $< $@
#	java -jar ~/webOS/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar --charset utf-8 --preserve-semi -o $@ $<

$(BUILDAPPDIR)/%.html : PopupDemoApp/%.html
	cp -p $< $@


$(BUILDAPPDIR)/appinfo.json : PopupDemoApp/appinfo.json
	cp -p $< $@


standard-ipk : $(minif) $(copyfiles) $(BUILDAPPDIR)/appinfo.json
	palm-package $(BUILDAPPDIR)


install : standard-ipk
	palm-install $(appid)_*

run : install
	palm-launch $(appid)

clean :
	-rm -rf $(BUILDAPPDIR) $(BUILDACCTDIR) $(BUILDSRVDIR) $(BUILDPKGDIR) buildapp buildacct buildsrv buildpkg

distclean : clean
	-rm -rf *.ipk

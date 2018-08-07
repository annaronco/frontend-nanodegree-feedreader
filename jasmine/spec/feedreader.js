/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/http:/);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
    });

    /* A new test suite named "The menu" */
    describe('The Menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            var body = document.querySelector('body');

            expect(body.className).toConain('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility on click at the icon', function() {
            var icon = $('.menu-icon-link');

            icon.click();
            expect(icon.className).not.toContain('menu-hidden');

            icon.click();
            expect(icon.className).toContain('menu-hidden');
        });
    });

    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        beforeEach(function(done) {
            loadFeed(function() {
            done();
            });
        });

       it('loadFeed function works', function() {
            var entries = document.getElementsByClassName('feed');

            expect(entries.length).not.toBe(0);
       });
    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
       var initalFeed;

       beforeEach(function(done) {
            loadFeed(function() {
                initalFeed = document.getElementsByClassName('feed').innerHTML;

                loadFeed(function() {
                    done();
                });
            });
        });

        it('new feed is loaded by loadFeed function', function() {
            var nextFeed = document.getElementsByClassName('feed').innerHTML;

            expect(initialFeed).not.toBe(nextFeed);
            done();
        });
    });
});

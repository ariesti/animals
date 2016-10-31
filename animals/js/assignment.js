
/*
 *      This file contains the javascript code for our assignment
 */

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times

var categories_template, category_template, animal_template;
var breadcrumb_template;
var current_category, current_animal;

// a helper function that instantiates a template
// and displays the results in the content div

function showTemplate(template, data){
    var html = template(data);
    $('#content').html(html);
}

// a second helper function that instantiates a template
// and displays the results in the content div

function showCategory() {
    showTemplate(category_template, current_category);
    $(".animal-thumbnail").click(function () {
        var index = $(this).data("id");
        current_animal = current_category.animals[index];
        showTemplate(animal_template, current_animal);
        $(".breadcrumb").append(breadcrumb_template({
            type: "animal",
            name: current_animal.name
        }));
        $("#animal-crumb").click(function () {
            return false;
        });
    });
}

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here

$(document).ready(function() {

    //
    // compile all of our templates ready for use
    //
    var source;
    source = $("#categories-template").html();
    categories_template = Handlebars.compile(source);
    source = $("#category-template").html();
    category_template = Handlebars.compile(source);
    source = $("#animal-template").html();
    animal_template = Handlebars.compile(source);
    source = $("#breadcrumb-template").html();
    breadcrumb_template = Handlebars.compile(source);

    // 
    //  clicking on the categories tab shows the 
    //  breadcrumb trailes to all of the details
    //  clicking on the animals images leads to 
    //  other images, and ultimately description
    
    $("#categories-crumb").click(function () {
        showTemplate(categories_template, animals_data);
        $(".breadcrumb").children().filter(":gt(0)").remove();
        $(".category-thumbnail").click(function () {
            var index = $(this).data("id");
            current_category = animals_data.category[index];
            showCategory();
            $(".breadcrumb").append(breadcrumb_template({
                type: "category",
                name: current_category.name
            }));
            $("#category-crumb").click(function () {
                showCategory();
                $(".breadcrumb").children().filter(":gt(1)").remove();
                return false;
            });
        });
        return false;
    });

    $("#categories-crumb").click();
});

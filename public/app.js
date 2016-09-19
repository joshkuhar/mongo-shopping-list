var ShoppingList = function() {
    this.items = [];
    this.itemList = $('.item-list');
    this.itemListTemplate = Handlebars.compile($("#item-list-template").html());
    this.form = $('.add-item-form');
    this.form.submit(this.onAddItemSubmit.bind(this));
    this.input = $('#item-input');
    this.main = $('.main');
    this.main.on('dblclick', 'li',
        this.onEditItemClicked.bind(this));
    this.main.on('submit', '.edit-item-form',
        this.onEditItemSubmit.bind(this));
    this.main.on('focusout', 'li input',
        this.onEditFocusOut.bind(this));
    this.main.on('click', 'li .delete-item',
        this.onDeleteItemClicked.bind(this));
    this.getItems();
};
ShoppingList.prototype.onAddItemSubmit = function(event) {
    event.preventDefault();
    var value = this.input.val().trim();
    if (value != '') {
        this.addItem(value);
    }
    this.form[0].reset();
};
ShoppingList.prototype.onEditItemClicked = function(event) {
    event.preventDefault();
    var item = $(event.target).parents('li');
    var display = item.children('.display');
    var form = item.children('form');
    var input = form.children('input');
    var name = display.children('.name');
    form.attr('hidden', null);
    input.focus();
    input.val(name.text());
    display.hide();
};
ShoppingList.prototype.onEditItemSubmit = function(event) {
    event.preventDefault();
    var input = $(event.target).children('input');
    input.blur();
};
ShoppingList.prototype.onEditFocusOut = function(event) {
    var item = $(event.target).parents('li');
    var id = item.data('id');
    var display = item.children('.display');
    var form = item.children('form');
    var input = form.children('input');
    var name = display.children('.name');
    var value = input.val().trim();
    if (value != '') {
        this.editItem(id, value);
        name.text(value);
    }
    form.attr('hidden', true);
    display.show();
    event.preventDefault();
};
ShoppingList.prototype.onDeleteItemClicked = function(event) {
    var id = $(event.target).parents('li').data('id');
    this.deleteItem(id);
};
ShoppingList.prototype.getItems = function() {
    var ajax = $.ajax('/items', {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(this.onGetItemsDone.bind(this));
};
ShoppingList.prototype.addItem = function(name) {
    var item = {
        'name': name
    };
    var ajax = $.ajax('/items', {
        type: 'POST',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(this.getItems.bind(this));
};
ShoppingList.prototype.deleteItem = function(id) {
    var ajax = $.ajax('/items/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done(this.getItems.bind(this));
};


ShoppingList.prototype.editItem = function(id, name) {
    var item = {
        'name': name,
        'id': id
    };
    var ajax = $.ajax('/items/' + id, {
        type: 'PUT',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(this.getItems.bind(this));
};
ShoppingList.prototype.onGetItemsDone = function(items) {
    this.items = items;
    this.updateItemsView();
};
ShoppingList.prototype.updateItemsView = function() {
    var context = {
        items: this.items
    };
    var itemList = $(this.itemListTemplate(context));
    this.itemList.replaceWith(itemList);
    this.itemList = itemList;
};
$(document).ready(function() {
    var app = new ShoppingList();
});
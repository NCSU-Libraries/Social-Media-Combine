var app = angular.module("myModule", ["schemaForm"]);
app.controller("FormController", function($scope, $http, $templateCache) {

  $scope.schema = {
    "type": "object",
    "title": "Comment",
    "properties": {
      "instagram_client_id": {
        "title": "Instagram Client Id",
        "description": "API client id retrieved from Instagram.",
        "type": "string",
        "maxLength": 100,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 100 characters."
      },
      "instagram_client_secret": {
        "title": "Instagram Client Secret",
        "type": "string",
        "description": "API client \"secret\" retrieved from Instagram.",
        "maxLength": 100,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 100 characters."
      },
      "instagram_access_token": {
        "title": "Instagram Access Token (OPTIONAL)",
        "type": "string",
        "description": "Instagram OAuth token. Only required for posting donor agreements, not for harvesting.",
        "maxLength": 100,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 100 characters."
      },
      "google_analytics_tracker": {
        "title": "Google Analytics Tracker (OPTIONAL)",
        "type": "string",
        "maxLength": 20,
        "description": "Google Analytics tracker ID for tracking lentil usage.",
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 20 characters."
      },
      "application_name": {
        "title": "Application Name",
        "type": "string",
        "description": "Application name for use in lentil.",
        "maxLength": 50,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 50 characters."
      },
      "division_name": {
        "title": "Division Name",
        "type": "string",
        "description": "Division/department name for use in lentil.",
        "maxLength": 50,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 50 characters."
      },
      "division_url": {
        "title": "Division URL",
        "type": "string",
        "description": "URL of division/department for use in lentil.",
        "maxLength": 50,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 50 characters."
      },
      "organization_name": {
        "title": "Organization Name",
        "type": "string",
        "description": "Organization name.",
        "maxLength": 50,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 50 characters."
      },
      "meta_description": {
        "title": "Meta Description",
        "type": "string",
        "maxLength": 50,
        "description": "Application description for use by search engines.",
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 50 characters."
      },
      "base_image_file_dir": {
        "title": "Image file directory",
        "type": "string",
        "description": "Should be /lentil_store unless you've changed the lentil container.",
        "maxLength": 20,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 20 characters."
      },
      "donor_agreement_text": {
        "title": "Donor Agreement Text",
        "description": "Text for lentil donor agreements if submitted by application. Currently disabled.",
        "type": "string",
        "maxLength": 300,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 300 characters."
      },
      // "dummy_admin_user": {
      //   "title": "Add Dummy Admin User?",
      //   "type": "string",
      //   "enum": [
      //     "Yes",
      //     "No"
      //   ]
      // },
      // "fetch_by_tag_freq": {
      //   "title": "Fetch-by-tag task frequency",
      //   "type": "string",
      //   "description": "Description about this field",
      //   "maxLength": 20,
      //   "minLength": 2,
      //   "validationMessage": "Entered value should be greater than 2 and less than 20 characters."
      // },
      "SFM_TWITTER_DEFAULT_USERNAME": {
        "title": "Twitter Username",
        "description": "Twitter username for API access.",
        "type": "string",
        "maxLength": 100,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 100 characters."
      },
      "SFM_TWITTER_CONSUMER_KEY": {
        "title": "Twitter API key",
        "description": "Twitter API key.",
        "type": "string",
        "maxLength": 100,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 100 characters."
      },
      "SFM_TWITTER_CONSUMER_SECRET": {
        "title": "Twitter Secret",
        "description": "Twitter API \"secret.\"",
        "type": "string",
        "maxLength": 100,
        "minLength": 2,
        "validationMessage": "Entered value should be greater than 2 and less than 100 characters."
      }
    },
    "required": [
      "instagram_client_id",
      "instagram_client_secret",
      "organization_name",
      "division_url",
      "application_name",
      "division_name",
      "meta_description",
      "SFM_TWITTER_DEFAULT_USERNAME",
      "SFM_TWITTER_CONSUMER_KEY",
      "SFM_TWITTER_CONSUMER_SECRET"
    ]
  };

  $scope.form = [{
      "key": "instagram_client_id",
      "placeholder": "Enter Instagram Client Id Value",
      "htmlClass": "content",
      "labelHtmlClass": "ici_label",
      "fieldHtmlClass": "ici_field"
    },

    {
      "key": "instagram_client_secret",
      "placeholder": "Enter Instagram Client Secret Value",
      "htmlClass": "content",
      "labelHtmlClass": "ics_label",
      "fieldHtmlClass": "ics_field"
    }, {
      "key": "instagram_access_token",
      "placeholder": "Enter Instagram Access Token Value (OPTIONAL)",
      "htmlClass": "content",
      "labelHtmlClass": "iat_label",
      "fieldHtmlClass": "iat_field"
    }, {
      "key": "organization_name",
      "placeholder": "Enter Organization Name",
      "htmlClass": "content",
      "labelHtmlClass": "on_label",
      "fieldHtmlClass": "on_field"
    }, {
      "key": "division_url",
      "placeholder": "Enter Division URL",
      "htmlClass": "content",
      "labelHtmlClass": "du_label",
      "fieldHtmlClass": "du_field"
    }, {
      "key": "application_name",
      "placeholder": "Enter Application Name",
      "htmlClass": "content",
      "labelHtmlClass": "an_label",
      "fieldHtmlClass": "an_field"
    }, {
      "key": "division_name",
      "placeholder": "Enter Division Name",
      "htmlClass": "content",
      "labelHtmlClass": "dn_label",
      "fieldHtmlClass": "dn_field"
    }, {
      "key": "meta_description",
      "placeholder": "Enter Meta Description",
      "htmlClass": "content",
      "labelHtmlClass": "md_label",
      "fieldHtmlClass": "md_field"
    }, {
      "key": "base_image_file_dir",
      "placeholder": "/lentil-store",
      "htmlClass": "content",
      "labelHtmlClass": "bifd_label",
      "fieldHtmlClass": "bifd_field"
    }, {
      "key": "donor_agreement_text",
      "placeholder": "Enter Donor Agreement Text",
      "htmlClass": "content",
      "labelHtmlClass": "dat_label",
      "fieldHtmlClass": "dat_field"
    }, {
      "key": "google_analytics_tracker",
      "placeholder": "Enter Google Analytics Tracker",
      "htmlClass": "content",
      "labelHtmlClass": "gat_label",
      "fieldHtmlClass": "gat_field"
    },
    // {
    //   "key": "fetch_by_tag_freq",
    //   "placeholder": "Enter Fetch-by-tag task frequency ",
    //   "htmlClass": "content",
    //   "labelHtmlClass": "fbtf_label",
    //   "fieldHtmlClass": "fbtf_field"
    // },
    // {
    //   "key": "dummy_admin_user",
    //   "type": "radios",
    //   "labelHtmlClass": "dau_label",
    //   "htmlClass": "dau_content",

    //   "fieldHtmlClass": "dau_field",
    //   "titleMap": [{
    //     "value": "Yes",
    //     "name": "Yes"
    //   }, {
    //     "value": "No",
    //     "name": "No"
    //   }]
    // },
    {
      "key": "SFM_TWITTER_DEFAULT_USERNAME",
      "placeholder": "Enter Twitter username",
      "htmlClass": "content",
      "labelHtmlClass": "stdu_label",
      "fieldHtmlClass": "stdu_field"
    }, {
      "key": "SFM_TWITTER_CONSUMER_KEY",
      "placeholder": "Enter Twitter API key value",
      "htmlClass": "content",
      "labelHtmlClass": "stck_label",
      "fieldHtmlClass": "stck_field"
    }, {
      "key": "SFM_TWITTER_CONSUMER_SECRET",
      "placeholder": "Enter Twitter Consumer Secret Value",
      "htmlClass": "content",
      "labelHtmlClass": "stcs_label",
      "fieldHtmlClass": "stcs_field"
    },

    {
      "type": "submit",
      "style": "btn-info",
      "title": "OK"
    }
  ];

  $scope.data = {};

  $scope.setModel = function () {
    var method = 'GET';
    var url = 'configData';
    $http({
      method: method,
      url: url,
    }).success(function (data, status) {
      $scope.model = data;
    }).error(function (data, status) {
      $scope.model = {};
    });
  };

  $scope.setModel();

  $scope.onSubmit = function(form, model) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');

    // Then we check if the form is valid
    if (form.$valid) {
      $scope.method = 'POST';
      $scope.url = 'Submit';

      $scope.code = null;
      $scope.response = null;

      $http({
        method: $scope.method,
        url: $scope.url,
        cache: $templateCache,
        data: $scope.model
      }).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        alert("You did it! Your applications should be updated within a minute or so.");
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
        if ($scope.status == "300") {
          alert($scope.data);
          $scope.setModel();
        }
      });
    }
  };
});

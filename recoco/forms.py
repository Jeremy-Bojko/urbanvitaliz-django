import os

from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from django import forms
from phonenumber_field.formfields import PhoneNumberField
from phonenumber_field.widgets import PhoneNumberInternationalFallbackWidget

from recoco.apps.addressbook import models as addressbook_models


class BaseSignupForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Skip captcha during tests
        if "PYTEST_CURRENT_TEST" in os.environ:
            self.fields.pop("captcha")

        self.fields["email"].widget = forms.TextInput(
            attrs={"type": "email", "class": "fr-input fr-mt-2v fr-mb-4v"}
        )

    first_name = forms.CharField(
        max_length=50,
        required=True,
        label="Prénom",
        widget=forms.TextInput(attrs={"class": "fr-input fr-mt-2v fr-mb-4v"}),
    )

    last_name = forms.CharField(
        max_length=50,
        required=True,
        label="Nom",
        widget=forms.TextInput(attrs={"class": "fr-input fr-mt-2v fr-mb-4v"}),
    )

    organization = forms.CharField(
        max_length=50,
        required=True,
        label="Organisation",
        widget=forms.TextInput(attrs={"class": "fr-input fr-mt-2v fr-mb-4v"}),
    )

    organization_position = forms.CharField(
        max_length=50,
        required=True,
        label="Fonction",
        widget=forms.TextInput(attrs={"class": "fr-input fr-mt-2v fr-mb-4v"}),
    )

    phone_no = PhoneNumberField(
        required=True,
        label="Numéro de téléphone",
        widget=PhoneNumberInternationalFallbackWidget(
            attrs={"class": "fr-input fr-mt-2v fr-mb-4v"}
        ),
    )

    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={"hl": "fr"}))

    def save(self, request):
        # Ensure you call the parent class's save.
        # .save() returns a User object.
        user = super().save(request)

        data = self.cleaned_data

        org_name = data.get("organization")
        organization = addressbook_models.Organization.get_or_create(org_name)
        organization.sites.add(request.site)

        user.profile.organization = organization
        user.profile.organization_position = data["organization_position"]
        user.profile.phone_no = data.get("phone_no", None)
        user.profile.save()

        return user

    def signup(self, request, user):
        pass

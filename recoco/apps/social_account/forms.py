from allauth.socialaccount.forms import SignupForm as BaseSocialSignupForm

from recoco.apps.home.forms import UVSignupForm as BaseSignupForm


class SocialSignupForm(BaseSocialSignupForm, BaseSignupForm):
    pass

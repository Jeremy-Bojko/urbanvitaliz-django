# encoding: utf-8

"""
Tests for project application

authors: raphael.marvie@beta.gouv.fr, guillaume.libersat@beta.gouv.fr
created: 2021-06-01 10:11:56 CEST
"""


import pytest
from django.contrib.auth import models as auth_models
from django.contrib.sites import models as sites_models
from model_bakery import baker


from .. import models
from .. import subscription

####################################
# Helpers
####################################
@pytest.mark.django_db
def test_user_subscribes_to_project():
    site = baker.make(sites_models.Site)
    project = baker.make(models.Project, sites=[site])
    user = baker.make(auth_models.User)
    user.profile.sites.add(site)

    subscription.subscribe_to_project(site, user, project)

    assert models.Subscription.objects.filter(
        user=user, project=project, site=site
    ).exists()


@pytest.mark.django_db
def test_user_of_another_site_subscribes_to_project():
    site = baker.make(sites_models.Site)
    project = baker.make(models.Project, sites=[site])
    user = baker.make(auth_models.User)

    with pytest.raises(ValueError):
        subscription.subscribe_to_project(site, user, project)

    assert not models.Subscription.objects.filter(
        user=user, project=project, site=site
    ).exists()


@pytest.mark.django_db
def test_user_unsubscribes_from_project():
    site = baker.make(sites_models.Site)
    project = baker.make(models.Project, sites=[site])
    user = baker.make(auth_models.User)
    user.profile.sites.add(site)

    baker.make(models.Subscription, user=user, project=project, site=site)

    subscription.unsubscribe_from_project(site, user, project)

    assert not models.Subscription.objects.exists()


@pytest.mark.django_db
def test_is_subscribed_to_project():
    site = baker.make(sites_models.Site)
    project = baker.make(models.Project, sites=[site])
    user = baker.make(auth_models.User)
    user.profile.sites.add(site)

    baker.make(models.Subscription, user=user, project=project, site=site)

    assert subscription.is_subscribed_to_project(site, user, project)
    assert not subscription.is_subscribed_to_project(site, user, None)
    assert not subscription.is_subscribed_to_project(None, user, project)
    assert not subscription.is_subscribed_to_project(site, None, project)


####################################
# Views
####################################

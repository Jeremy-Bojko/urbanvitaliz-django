from collections import defaultdict

from django.core.serializers import serialize
from django.utils.timezone import localtime
from notifications import models as notifications_models

from recoco import verbs
from recoco.utils import check_if_advisor

from .utils import can_administrate_project


def is_switchtender_processor(request):
    return {
        "is_switchtender": check_if_advisor(request.user),
        "is_administrating_project": can_administrate_project(
            project=None, user=request.user
        ),
    }


def unread_notifications_processor(request):
    if not request.user.is_authenticated:
        return {}

    unread_notifications = (
        notifications_models.Notification.on_site.unread()
        .filter(recipient=request.user, public=True)
        .prefetch_related("actor__profile__organization")
        .prefetch_related("action_object")
        .prefetch_related("target")
        .order_by("-timestamp")[:100]
    )

    grouped_notifications = defaultdict(list)

    show_project_verb_list = [
        verbs.Document.ADDED,
        verbs.Document.ADDED_FILE,
        verbs.Document.ADDED_LINK,
        verbs.Recommendation.COMMENTED,
        verbs.Recommendation.CREATED,
        verbs.Conversation.PUBLIC_MESSAGE,
        verbs.Conversation.PRIVATE_MESSAGE,
        verbs.Conversation.POST_MESSAGE,
        verbs.Survey.STARTED,
        verbs.Survey.UPDATED,
    ]

    for notification in unread_notifications:
        date = localtime(notification.timestamp).date()
        grouped_notifications[date].append(notification)

    return {
        "unread_notifications": serialize("json", unread_notifications.all()),
        "unread_notifications_count": unread_notifications.count(),
        "grouped_notifications": dict(grouped_notifications),
        "show_project_verb_list": show_project_verb_list,
    }


# eof

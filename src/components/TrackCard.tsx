import { Card, CardContent } from "./ui/card"

const TrackCard = ({track}) => {
    return (
        <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{track.title}</span>
            </CardContent>
        </Card>
    )
}
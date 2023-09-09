[Route("api/[controller]")]
public class MyController : Controller
{
    [HttpGet]
    public string Get()
    {
        // Your C# code here
        return "Hello from C#";
    }
}
